import time
import cohere
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
api_key = 'oF6eA5FnAgLKeezfIAgjWn7PraIRJHH00riUjr5Q'  # Add your API key here instead of api_key
co = cohere.Client(api_key)


@app.route('/api/summarize', methods=['POST'])
def summarize_text():
    prompt = request.json.get('text')
    response = co.summarize(
    length="long",
    text=prompt,
    format='paragraph',
    model='summarize-xlarge',
    additional_command='',
    temperature=0.1,
    )

    result_dict = {
            'id': response.id,
            'summary': response.summary,
            'meta': response.meta,
        }

    return jsonify(result_dict)
    # print('Summary:', response.summary)
    # print(response)
    # return jsonify(response.__dict__)





