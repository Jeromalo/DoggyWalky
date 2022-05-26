import bcrypt
from sqlalchemy import null
from init_db import init_db
import models
from database import db_session

init_db() # remise à zéro de la base de données
session = db_session() # création du curseur d'accès à la base de données

# session.add(mon_chien) # ajouté à la "file d'attente" de la base de données

pw_hash = bcrypt.hashpw(str.encode('toto', 'utf-8'), b'$2b$12$9GckBMxH0b2bVWzJiFrJx.')
mon_user = models.User(username="Toto", birthdate="1999-01-08", email="toto@toto.net", password=pw_hash, description="Mon chien, Kiki, adore se rouler dans la boue et manger les chaussons de Jacqueline.")
session.add(mon_user)
session.commit()

pw_hash2 = bcrypt.hashpw(str.encode('titi', 'utf-8'), b'$2b$12$9GckBMxH0b2bVWzJiFrJx.')
mon_user2 = models.User(username="Titi", birthdate="1999-01-08", email="titi@titi.net", password=pw_hash2, description="Mon chien, Kiki, adore se rouler dans la boue et manger les chaussons de Jacqueline.")
session.add(mon_user2)
session.commit()

ma_conversation1 = models.Conversation(title="Les carlins du 14e arrondissement")
session.add(ma_conversation1)
session.commit()

ma_conversation2 = models.Conversation(title="Jean-Louis Dupont")
session.add(ma_conversation2)
session.commit()

ma_conversation3 = models.Conversation(title="Square de la place Denfert")
session.add(ma_conversation3)
session.commit()

ma_conversation4 = models.Conversation(title="Les amis du quartier Vaugirard")
session.add(ma_conversation4)
session.commit()

ma_conversation5 = models.Conversation(title="Jacqueline")
session.add(ma_conversation5)
session.commit()

mon_chien = models.Dog(dogname="Kiki", gender="Male", breed="caniche", owner=mon_user.id, picturepath="caniche.jpg")
session.add(mon_chien)
session.commit()

mon_message1 = models.Message(sender=1, conversation=1, content="Hello World")
session.add(mon_message1)
session.commit()

mon_message2 = models.Message(sender=2, conversation=2, content="Coucou World")
session.add(mon_message2)
session.commit()

mon_message3 = models.Message(sender=1, conversation=3, content="Buenos Dias World")
session.add(mon_message3)
session.commit()

mon_message4 = models.Message(sender=2, conversation=4, content="Ciao World")
session.add(mon_message4)
session.commit()

mon_message5 = models.Message(sender=1, conversation=5, content="Welcome World")
session.add(mon_message5)
session.commit()

mon_participant = models.Participant(users=1, conversation=1, isAdmin=True)
session.add(mon_participant)
session.commit()

mon_participant2 = models.Participant(users=2, conversation=1, isAdmin=True)
session.add(mon_participant2)
session.commit()



session.close()
