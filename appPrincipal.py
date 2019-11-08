
import requests
import os
import json
import time, uuid, urllib, json
import hmac, hashlib

from base64 import b64encode
from flask              import Flask, session,render_template,request,Response
from flask_session      import Session
from flask_sqlalchemy   import SQLAlchemy
from sqlalchemy         import create_engine
from sqlalchemy.orm     import scoped_session, sessionmaker


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://gpoyfyitqdntzv:67f826c7ba2729a8f8e0b73ff6280b0332dff516d589a4d064426a0484fff1c2@ec2-54-83-55-125.compute-1.amazonaws.com:5432/d9p3vo3kqndk4i'
# engine = create_engine('postgres://gpoyfyitqdntzv:67f826c7ba2729a8f8e0b73ff6280b0332dff516d589a4d064426a0484fff1c2@ec2-54-83-55-125.compute-1.amazonaws.com:5432/d9p3vo3kqndk4i',convert_unicode=True)
# db= scoped_session(sessionmaker(autocommit=False,autoflush=False,bind=engine))

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

def peticion(pais):
    app_id = 'tzEEP438'
    consumer_key = 'dj0yJmk9VGNLVUQ3RTRXWjVZJmQ9WVdrOWRIcEZSVkEwTXpnbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTZi'
    consumer_secret = 'd39e8cbb0f79f939e5eb36d51c70e59f11ceefd2'
    query = {'location': str(pais), 'format': 'xml', 'u': 'c'}

    url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss'
    method = 'GET'
    concat = '&'
    oauth = {
        'oauth_consumer_key': consumer_key,
        'oauth_nonce': uuid.uuid4().hex,
        'oauth_signature_method': 'HMAC-SHA1',
        'oauth_timestamp': str(int(time.time())),
        'oauth_version': '1.0'
    }

    #Prepare signature string (merge all params and SORT them)
    merged_params = query.copy()
    merged_params.update(oauth)
    sorted_params = [k + '=' + urllib.parse.quote(merged_params[k], safe='') for k in sorted(merged_params.keys())]
    signature_base_str = method + concat + urllib.parse.quote(url, safe='') + concat + urllib.parse.quote(concat.join(sorted_params), safe='')

    #Generate signature
    composite_key = urllib.parse.quote(consumer_secret, safe='') + concat
    oauth_signature = b64encode(hmac.new(composite_key.encode('utf-8'), signature_base_str.encode('utf-8'), hashlib.sha1).digest())

    #Prepare Authorization header
    oauth['oauth_signature'] = oauth_signature.decode('utf-8')
    auth_header = 'OAuth ' + ', '.join(['{}="{}"'.format(k,v) for k,v in oauth.items()])

    #Send request
    url = url + '?' + urllib.parse.urlencode(query)
    request = urllib.request.Request(url)
    request.headers['Authorization'] = auth_header
    request.headers['X-Yahoo-App-Id']= app_id
    response = urllib.request.urlopen(request).read()
    return response


@app.route("/peticion",methods=["GET"])
def cliente():
    
    if request.method == "GET":
        recibido = request.args.get("mensaje")
        pais= request.args.get("pais")
        yahooPeticion = peticion(pais)
        print(recibido)
        print(pais)
        return yahooPeticion


@app.route("/",methods=["GET","POST"])
def index():
    yahooPeticion = peticion("ilinois")
    return render_template("home.html",respuesta=yahooPeticion)

if __name__ == '__main__':
    app.run(host="localhost",port=8000)