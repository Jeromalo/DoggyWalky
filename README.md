Les images se mettent dans public/static/images/ 

npm install react-router-dom
npm install @material/typography

------ lancement bdd ------

sudo -u postgres psql db_doggywalky

------ To change the the postgres user's password follow this steps: ------
Login into the psql:
$ sudo -u postgres psql
Then in the psql console change the password and quit:
postgres=# \password postgres
Enter new password: <new-password>
postgres=# \q
or using a query:
ALTER USER postgres PASSWORD '<new-password>';


------ GIT ------
Pour mettre à jour SA branche : 
- GIT add .
- GIT commit -m 'nom du commit'
- GIT Push

Pour avoir en local toutes les branches à jour :
- GIT Fetch

Pour FUSIONNER sa branche locale avec la branche "develop" : (ne pas oublier le FETCH avant !)
- GIT merge origin develop
Ensuite, à voir, s'il faut accepter les CURRENT changes (ce qu'il y a actuellement en local) ou les INCOMING changes (ce qui vient du develop)

Pour changer de branche : (ne pas oublier de faire un FETCH avant !)
- GIT checkout nom-de-la-branche

Pour mettre SES éléments en local sur la branche develop : 
- GIT Fetch
- GIT checkout develop
- GIT merge origin -mabranche- 
Ensuite, à voir, s'il faut accepter les CURRENT changes (ce qu'il y a actuellement sur le develop) ou les INCOMING changes (ce qui vient de ma branche)
- GIT add .
- GIT commit -m 'changement apporté sur ...'
- GIT push

Ne pas hésiter à communiquer pour voir qui est en avance ou non avant de modifier le develop et fusionner.
