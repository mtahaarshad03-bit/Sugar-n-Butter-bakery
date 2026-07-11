from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Taake frontend se request block na ho

# Aapka naya n8n Webhook URL
N8N_WEBHOOK_URL = "https://tom321.app.n8n.cloud/webhook/e8db3c47-3c7e-4525-a84a-43c9a2a760c3"

@app.route('/place-order', methods=['POST'])
def place_order():
    try:
        # Frontend se data lena
        order_data = request.json
        
        # Check karein ke data empty to nahi
        if not order_data:
            return jsonify({"error": "No data received"}), 400

        print(f"Sending order to n8n: {order_data}")

        # n8n ko data forward karna (Google Sheets aur Gmail ke liye)
        # n8n khud hi is data ko aapki sheet (1HZ0EHf-FiDVM_0wXdpP9MFYZgWKlEsHJvMK8u6sRlBw) mein save karega
        response = requests.post(N8N_WEBHOOK_URL, json=order_data)

        if response.status_code == 200:
            return jsonify({"message": "Order forwarded to n8n successfully!"}), 200
        else:
            return jsonify({"error": "Failed to connect to n8n"}), 500

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Server run karna
    app.run(debug=True, port=5000)