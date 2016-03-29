export PATH=/Users/lmpsilva/Documents/Development/mongodb/bin:$PATH

mongo fiber --eval "db.dropDatabase()"

## anchor-types
mongoimport --db fiber --collection anchor_types --file ./anchor_types.json --jsonArray
mongo fiber --eval "db.anchor_types.ensureIndex( { 'description': 1} )"

##ancoras
mongoimport --db fiber --collection anchors --file ./anchors.json --jsonArray
mongo fiber --eval "db.anchors.ensureIndex( { 'loc': '2dsphere' } );db.anchors.ensureIndex( { 'tipo.description': 1} );"

## padroes_cor
# mongoimport --db fiber --collection padroes_cor --file ./db/padroes_cor.json --jsonArray
# mongo fiber --eval "db.padroes_cor.ensureIndex( { 'nome': 1} )"

## caixas
# mongoimport --db fiber --collection caixas --file ./db/caixas.json --jsonArray
# mongo fiber --eval "db.caixas.ensureIndex( { 'nome': 1} )"

## cabos
# mongoimport --db fiber --collection cabos --file ./db/cabos.json --jsonArray
# mongo fiber --eval "db.cabos.ensureIndex( { 'nome': 1} )"


# mongoimport --db fiber --collection users --file ./db/users.json --jsonArray
