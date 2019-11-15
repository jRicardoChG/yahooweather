
import requests
import os
import json

from base64             import b64encode
from flask              import Flask, session,render_template,request,Response
from flask_session      import Session
from flask_sqlalchemy   import SQLAlchemy
from sqlalchemy         import create_engine
from sqlalchemy.orm     import scoped_session, sessionmaker
from peticionyahoo      import peticion


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://gpoyfyitqdntzv:67f826c7ba2729a8f8e0b73ff6280b0332dff516d589a4d064426a0484fff1c2@ec2-54-83-55-125.compute-1.amazonaws.com:5432/d9p3vo3kqndk4i'
# engine = create_engine('postgres://gpoyfyitqdntzv:67f826c7ba2729a8f8e0b73ff6280b0332dff516d589a4d064426a0484fff1c2@ec2-54-83-55-125.compute-1.amazonaws.com:5432/d9p3vo3kqndk4i',convert_unicode=True)
# db= scoped_session(sessionmaker(autocommit=False,autoflush=False,bind=engine))

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#------------------VISTAS-----------------------------------

@app.route("/peticion",methods=["GET"])
def cliente():
    
    if request.method == "GET":
        recibido = request.args.get("mensaje")
        pais= request.args.get("pais")
        yahooPeticion = peticion(pais)
        print(yahooPeticion)
        return yahooPeticion


@app.route("/",methods=["GET","POST"])
def index():
    yahooPeticion = peticion("ilinois")
    return render_template("home.html",respuesta=yahooPeticion)

#-------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host="localhost",port=8000)