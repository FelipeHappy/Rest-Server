# WebServer + RestServer

Recuerda que debes ejecutar NPM INSTALL para reconstruir los modulos de Node.

# Git Merge Fallido

Revisar index.html + package-lock.json linea 3685 - 3695 REF stream search,
reemplzar por: 

     "string_decoder": {
       "version": "1.1.1",
       "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.1.1.tgz",
       "integrity": "sha512-n/ShnvDi6FHbbVfviro+WojiFzv+s8MPMHBczVePfUpDJLwoLT0ht1l4YwBCbi8pJAveEEdnkHyPyTP/mzRfwg==",
       "requires": {
         "safe-buffer": "~5.1.0"
       },

