export PATH=/Users/lmpsilva/Documents/Development/mongodb/bin:$PATH

mongo fiber --eval "db.users.drop()"

## users
mongoimport --db fiber --collection users --file ./users.json --jsonArray
mongo fiber --eval "db.users.ensureIndex( { 'username': 1} )"
