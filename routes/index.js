var GoogleSpreadsheet = require('google-spreadsheet');

exports.json = function(req, res, next) {
  res.set({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  next();
};

exports.index = function(req, res){
  
  var doc = new GoogleSpreadsheet(req.query.id);
  
  var sheet;
  
  console.log(doc.getRows);
  
  doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
  
     sheet.getRows({}, function( err, rows ){
        console.log('Read '+rows.length+' rows');

        for (var i in rows) {
          delete rows[i]["_xml"];
          delete rows[i]["_links"];
          
          if(rows[i].id.substring(0,20) == "https://spreadsheets") {
            delete rows[i].id;
          }
          
        }
       
        res.json(rows);

      });
    
    
  });
  
  
};