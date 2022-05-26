from flask import Flask, redirect, request, jsonify, render_template, url_for, jsonify
from flask_socketio import join_room, leave_room, emit, send, SocketIO
from sqlalchemy import asc, desc
import os
from werkzeug.utils import secure_filename
from flask import g
from datetime import datetime, timedelta, timezone
from database import db_session
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
import json
import models  # je récupère mes modèles
from models import User, Dog
import bcrypt
from uuid import uuid4

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "clef-secrète-à-remplacer"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")


UPLOAD_FOLDER = '../src/components/images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def make_unique(string):
    ident = uuid4().__str__()
    return f"{ident}-{string}"


user = models.User(
    email='email@exemple.fr',
)
db_session().add(user)

# SIGN UP


@app.route("/api/signup", methods=["POST"])
def signUp():
    db = db_session()
    print(db)
    try:
        emailForm = request.json.get("email")
        passwordForm = request.json.get("password")
        usernameForm = request.json.get("username")
        birthdateForm = request.json.get("birthdate")
        pw_hash = bcrypt.hashpw(str.encode(
            passwordForm, 'utf-8'), b'$2b$12$9GckBMxH0b2bVWzJiFrJx.')
        isEmail = db.query(User).filter_by(
            email=emailForm, password=pw_hash).first()
        if isEmail is None or isEmail == '':
            new_user = User(
                username=usernameForm,
                password=pw_hash,
                email=emailForm,
                birthdate=birthdateForm
            )
            db.add(new_user)
            db.commit()
            return ({'message': 'a new_user has been registered'}
                    )
        else:
            return({'message': 'Email already exists !'}
                   )
    except Exception as e:
        raise


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

# LOGOUT


@app.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({'message': "logout successful"})
    unset_jwt_cookies(response)
    return response

# LOG IN


@app.route('/token', methods=["POST"])
def create_token():
    try:
        db = db_session()
        emailForm = request.json.get("email", None)
        passwordForm = request.json.get("password", None)
        pw_hash = bcrypt.hashpw(str.encode(
            passwordForm, 'utf-8'), b'$2b$12$9GckBMxH0b2bVWzJiFrJx.')
        LoginQuery = db.query(User).filter_by(
            email=emailForm, password=pw_hash).first()
        if LoginQuery is None:
            print("Ceci n'est pas valide")
            return ("Ceci n'est pas valide")
        else:
            ObjectQuery = LoginQuery.serialize
            access_token = create_access_token(identity=ObjectQuery['email'])
            response = {"access_token": access_token,
                        "message": "You're logged in !"}
            return response
    except Exception as e:
        raise e

# HOMEPAGE CONVERSATIONS LIST

@app.route('/homepage', methods=['POST'])
@jwt_required()
def my_conversations():
    print("essai route conversations")
    db = db_session()
    try:
        print("Avant query conversations")
        ConversationQuery = db.query(models.Conversation).all()
        conversationList = []
        for c in ConversationQuery:
            conversationList.append({
                "id": c.id,
                "content": c.title})
            response = {
                "conversations": conversationList
                    }
            print("conversationList", conversationList)
        return response
    except Exception as e:
        raise


# DISPLAY USER PROFILE


@app.route('/api/profile', methods=['GET'])
@jwt_required()
def my_profile():
    email_jwt = get_jwt_identity()
    db = db_session()
    try:
        ProfileQuery = db.query(User).filter_by(email=email_jwt).first()
        DogQuery = ProfileQuery.dogs
        mes_dogs = []
        for dog in DogQuery:
            mes_dogs.append(dog.serialize)
        ObjectQuery = ProfileQuery.serialize
        username = ObjectQuery["username"]
        birthdate = ObjectQuery["birthdate"]
        description = ObjectQuery["description"]
        response = {
            "dogs": mes_dogs,
            "firstname": username,
            "lastname": birthdate,
            "email": email_jwt,
            "description": description
        }
        return response
    except Exception as e:
        raise

# ADD DOG


@app.route('/api/adddog', methods=["POST"])
@jwt_required()
def upload_file():
    print('> route found <')
    email_jwt = get_jwt_identity()
    db = db_session()
    if request.method == 'POST':
        ProfileQuery = db.query(User).filter_by(email=email_jwt).first()
        ObjectQuery = ProfileQuery.serialize
        UserId = ObjectQuery["id"]
        print(ObjectQuery["id"])
        print("dog name : ", request.form.get('dogname'))
        print("dog description : ", request.form.get('dogdescription'))
        print("dog gender : ", request.form.get('doggender'))
        print("dog breed : ", request.form.get('dogbreed'))
        if not request.files.get('dogimage'):
            print('No file part')
            return redirect(request.url)
        file = request.files.get('dogimage')
        if file.filename == '':
            print('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            print('saving file?')
            filename = secure_filename(file.filename)
            unique_filename = make_unique(filename)
            file.save(os.path.join(
                app.config['UPLOAD_FOLDER'], unique_filename))
            new_dog = Dog(
                dogname=request.form.get('dogname'),
                picturepath=unique_filename,
                breed=request.form.get('dogbreed'),
                gender=request.form.get('doggender'),
                owner=UserId
            )
            db.add(new_dog)
            db.commit()
            db.close()
    return {"message": "success"}

# CONVERSATIONS LIST


@app.route("/api/conversation-list", methods=['POST'])
@jwt_required()
def list_conversations():
    return (True)

# CREATE CONVERSATION


@app.route('/api/create-conversation', methods=['POST'])
@jwt_required()
def create_conversation():
    return (True)

# CHATROOM


@app.route('/api/conversation', methods=['POST'])
@jwt_required()
def conversation():
    return (True)  # renvoie un objet JSON des messages pour une chatroom donnée
# si la chatroom a des messages : renvoie une liste (via un objet json) des messages
# si l'utilisateur n'a pas de conversations : renvoie un résultat vide
    # groupId = request.json.get("groupId", None)
    # if groupId:
    #         messages = ???# à compléter...


@socketio.on('message sent', namespace='/chat')
@jwt_required()
def message_sent(jsonresponse):
    email_jwt = get_jwt_identity()
    db = db_session()
    if jsonresponse.get('message') and\
            jsonresponse.get('message') != "" and\
            jsonresponse.get('groupId') and\
            jsonresponse.get('message').isprintable() and not\
            jsonresponse.get('message').isspace() and not\
            jsonresponse.get('message').startswith('<script>'):
        print("===============> ", jsonresponse.get('message'))
        print("===============> ", jsonresponse.get('groupId'))
        ProfileQuery = db.query(User).filter_by(email=email_jwt).first()
        ObjectQuery = ProfileQuery.serialize
        UserId = ObjectQuery["id"]
        print("===============> ", UserId)

    message = models.Message(
        content=jsonresponse['message'].strip(),
        sender=UserId,  # récupère l’identité de l’utilisateur via JWT, utilisez une autre méthode si vous ne l’avez pas encore implémenté
        conversation=jsonresponse['groupId'])
    MessageQuery = message.serialize

    print(MessageQuery)
    try:
        print("avant insertion")
        db.add(message)
        print("après insertion")
        db.commit()
        print("après commit")

        # user = get_user(get_jwt_identity())# recupère l'objet user de la db à partir de son id // ???????????????????????????????????????????????
        msg = {
            'content': jsonresponse['message'].strip(),
            # 'title': jsonresponse.get('title'),
            'sender': {
                "username": ObjectQuery["username"],
                # "profilePicturePath": user.profilePicturePath,
                "email": email_jwt,
                "emailjwt": email_jwt},
            # 'profilePicturePath': get_user(get_jwt_identity()).profilePicturePath,
            'timestamp': json.dumps(datetime.now().strftime('%Y-%m-%d %H:%M:%S'), indent=4, sort_keys=True, default=str)
        }
        print("après msg")
        print(jsonresponse['groupId'])
        db.close()
        send(msg, namespace="/chat",
             room=jsonresponse['groupId'], broadcast=True)  # un message est renvoyé à tous les usagers de la room
        return {"success": True}
    except Exception as e:
        raise e
        # print("something went wrong during db insertion")
        # db.close()
    return {'error', 'Something went wrong'}, 500


# LIST MESSAGES

@app.route('/api/messagelist', methods=['POST'])
@jwt_required()
def list_messages():
    email_jwt = get_jwt_identity()
    groupId = request.json.get("groupId", None)
    print("===========> ", request.json.get("groupId"))
    try:
        db = db_session()
        group_messages = db.query(models.Message).filter_by(
            conversation=groupId).order_by(asc(models.Message.dateCreated)).all()  # récupération de tous les messages de mon modèle Message, sous covuert qu’ils appartiennent au groupe 'groupId'. Note : la méthode asc() est à importer depuis sqlalchemy
        print(group_messages)
        ConversationQuery = db.query(models.Conversation).filter_by(id=groupId).first()
        SerializeConversation = ConversationQuery.serialize
        TitleConversation = SerializeConversation['title']

        messageList = []
        for m in group_messages:  # si vous n’avez pas fait de serializer + relationship
            # pour chaque message, je récupère l’auteur, et je l’insère dans la liste
            sender = db.query(models.User).get(m.sender)
            messageList.append({
                # "title": m.title,
                "content": m.content,
                # "picturePath": m.picturePath,
                "sender": {
                    "username": sender.username,
                    # "profilePicturePath": sender.profilePicturePath,
                    "email": sender.email,
                    "emailjwt" : email_jwt

                },
                "timestamp": m.dateCreated})
            res = {"title": TitleConversation,
            "messages": messageList
                   }
        print("++++=====++++> Après boucle")
    except Exception as e:
        db.close()
        print(e)
        return {"error": "Something went wrong"}, 500
    print(jsonify(res))
    # Note : la fonction jsonify est à importer depuis flask
    return jsonify(res)


# JOIN ROOM

@socketio.on("join", namespace="/chat")
def join_group(jsonresponse):
    # gère l'arrivée d'une personne dans une chatroom, envoie un message à tous les utilisateurs
    groupId = jsonresponse.get("groupId")# id du groupe passé via get
    if groupId:
        print("If there is groupe Id : ", jsonresponse.get("groupId"))
        db = db_session()
        # users = [e.users for e in models.Conversation.query.get(
        #     jsonresponse['groupId']).participant]# récupère le groupe dont l'id est 'groupId' et vérifie que l'user est bien dans ce groupe
        # if (get_jwt_identity() not in users):# récupère un id avec la fonction get_jwt_identity (où nous avons enregistré l'id de l'utilisateur)
        # NOTE : les 2 lignes ci-dessus requièrent l'utilisation de @jwt_required() au-dessus de votre fonction
        join_room(groupId)# fonction à récupérer dans flask-socketio
        send("joined group", {"groupId": groupId},
                 namespace="/chat", room=groupId, broadcast=True)# renvoie un message informant tous les users d’une room qu’un utilisateur a rejoint le groupe
        db.close()
        return {"success": True}# pas besoin de récupérer directement ce paramètre, mais il est pertinent d’ajouter un return au cas où.
    return {"success": False}


if __name__ == "__main__":
    socketio.run(app, debug=True)
