from datetime import datetime
from flask import Flask, render_template, jsonify, request, redirect, url_for
import hashlib
import time

# Initialize Flask app
app = Flask(__name__)

@app.template_filter('datetimeformat')
def datetimeformat(value):
    return datetime.fromtimestamp(value).strftime('%Y-%m-%d %H:%M:%S')

# Blockchain functions (no classes, just functions)
def create_block(index, previous_hash, data):
    timestamp = time.time()
    block_hash = calculate_hash(index, timestamp, data, previous_hash)
    return {
        "index": index,
        "timestamp": timestamp,
        "data": data,
        "previous_hash": previous_hash,
        "hash": block_hash
    }

def calculate_hash(index, timestamp, data, previous_hash):
    value = f"{index}{timestamp}{data}{previous_hash}"
    return hashlib.sha256(value.encode()).hexdigest()

# Initialize the blockchain with the Genesis Block
def create_genesis_block():
    return create_block(0, "0", "Genesis Block")

# Initialize the blockchain
blockchain = [create_genesis_block()]

# Add a new block to the blockchain
def add_block(data):
    last_block = blockchain[-1]
    new_block = create_block(len(blockchain), last_block["hash"], data)
    blockchain.append(new_block)

# API endpoint to get the current blockchain
@app.route('/get_chain')
def get_chain():
    return jsonify({"chain": blockchain, "length": len(blockchain)})

# Main route to render the blockchain visualization page
@app.route('/')
def index():
    return render_template('dashboard.html', blockchain=blockchain)

@app.route('/history')
def history():
    return render_template('history.html', blockchain=blockchain)

# Route to add a new block
@app.route('/add_block', methods=['POST'])
def add_block_route():
    data = request.form['data']
    add_block(data)
    return redirect(url_for('index'))  # Redirect back to the homepage after adding a block

if __name__ == "__main__":
    app.run(debug=True)
