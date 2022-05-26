from sqlalchemy import Boolean, LargeBinary, Text, Column, func, Integer, String, ForeignKey, DateTime, TIMESTAMP, Table
from sqlalchemy.orm import relationship
from database import Base


class Contact(Base):
    __tablename__= 'contacts'
    id = Column(Integer, primary_key=True)
    userid = Column(Integer, ForeignKey("users.id"))
    contactid = Column(Integer, ForeignKey("users.id"))
    favourite = Column(Boolean, default=False)
    dateCreated = Column(TIMESTAMP, default=func.now())
    dateModified = Column(TIMESTAMP, default=func.now())


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    birthdate = Column(DateTime, nullable=False)
    address = Column(String(255), default=None)
    city = Column(String(255), default=None)
    zipcode = Column(String(16), default=None)
    email = Column(String(254), unique=True)
    password = Column(LargeBinary, nullable=False)
    description = Column(String(1024), default=None)
    profilePicturePath = Column(String(260))
    dogs = relationship('Dog')
    messages = relationship('Message')
    participants = relationship('Participant')
    contacts = relationship('User', secondary="contacts",
                            primaryjoin='User.id == Contact.userid',
                            secondaryjoin='User.id == Contact.contactid')
    dateCreated = Column(TIMESTAMP, default=func.now())
    dateModified = Column(TIMESTAMP, default=func.now())

    @property
    def favourites(self):
        return([contact for contact in self.contacts if contact.favourite])

    @property  # permet de ne pas avoir à écrire les parenthèses de voiture.serialize(), et de spécifier qu'il ne faut pas lui passer de paramètres
    def serialize(self):
        """la fonction serialize permet d'indiquer à python comment l'objet doit être transformé pour pouvoir être renvoyé via un return sur flask"""
        # Note: self fait référence à
        return {"id": self.id,  # self ici fait référence à l'objet en cours
                "username": self.username,
                "birthdate": self.birthdate,
                "address": self.address,
                "city": self.city,
                "zipcode": self.zipcode,
                "email": self.email,
                "password": self.password,
                "description": self.description,
                "ProfilePicture": self.profilePicturePath
                }

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)


class Dog(Base):
    __tablename__ = 'dogs'
    id = Column(Integer, primary_key=True)
    dogname = Column(String(50), nullable=False)
    gender = Column(String(50), default=None)
    breed = Column(String(50), default=None)
    picturepath = Column(String(260), default=None)
    owner = Column('User', Integer, ForeignKey("users.id"))
    dateCreated = Column(TIMESTAMP, default=func.now())
    dateModified = Column(TIMESTAMP, default=func.now())

    @property  # permet de ne pas avoir à écrire les parenthèses de voiture.serialize(), et de spécifier qu'il ne faut pas lui passer de paramètres
    def serialize(self):
        """la fonction serialize permet d'indiquer à python comment l'objet doit être transformé pour pouvoir être renvoyé via un return sur flask"""
        # Note: self fait référence à
        return {"id": self.id,  # self ici fait référence à l'objet en cours
                "dogname": self.dogname,
                "gender": self.gender,
                "breed": self.breed,
                "picturepath": self.picturepath,
                }


class Participant(Base):
    __tablename__ = 'participants'
    id = Column(Integer, primary_key=True)
    users = Column('User', Integer, ForeignKey("users.id"))
    conversation = Column('Conversation', Integer,
                          ForeignKey("conversations.id"))
    isAdmin = Column(Boolean, default=False)
    dateCreated = Column(TIMESTAMP, default=func.now())
    dateModified = Column(TIMESTAMP, default=func.now())


class Conversation(Base):
    __tablename__ = 'conversations'
    id = Column(Integer, primary_key=True)
    participants = relationship('Participant')
    # users = relationship('User'
    # , secondary='Participant', primaryjoin='Conversation.id==Participant.conversation', secondaryjoin='Participant.users==User.id'
    # )
    title = Column(String(255), nullable=False)
    dateCreated = Column(TIMESTAMP, default=func.now())
    dateModified = Column(TIMESTAMP, default=func.now())

    @property  # permet de ne pas avoir à écrire les parenthèses de voiture.serialize(), et de spécifier qu'il ne faut pas lui passer de paramètres
    def serialize(self):
        """la fonction serialize permet d'indiquer à python comment l'objet doit être transformé pour pouvoir être renvoyé via un return sur flask"""
        # Note: self fait référence à
        return {"id": self.id,  # self ici fait référence à l'objet en cours
                "participants": self.participants,
                "title": self.title,
                "dateCreated": self.dateCreated,
                "dateModified": self.dateModified
                }



class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    sender = Column('User', Integer, ForeignKey("users.id"))
    conversation = Column('Conversation', Integer,
                          ForeignKey("conversations.id"), nullable=True)
    content = Column(Text)
    filepath = Column(String(260), default=None)
    dateCreated = Column(TIMESTAMP, default=func.now())
    dateModified = Column(TIMESTAMP, default=func.now())

    @property  # permet de ne pas avoir à écrire les parenthèses de voiture.serialize(), et de spécifier qu'il ne faut pas lui passer de paramètres
    def serialize(self):
        """la fonction serialize permet d'indiquer à python comment l'objet doit être transformé pour pouvoir être renvoyé via un return sur flask"""
        # Note: self fait référence à
        return {"id": self.id,  # self ici fait référence à l'objet en cours
                "sender": self.sender,
                "conversation": self.conversation,
                "content": self.content,
                "filepath": self.filepath,
                "dateCreated": self.dateCreated,
                "dateModified": self.dateModified
                }
