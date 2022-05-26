from database import db_session, Base, engine
import models

def init_db():
    Base.metadata.drop_all(bind=engine) # supprime le contenu de la db
    Base.metadata.create_all(bind=engine) #re-crée les modèles

if __name__=="__main__":
    init_db()
