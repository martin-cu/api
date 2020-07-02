const db_model = require('../models/db');

exports.import = function(req, res, next) {
	var data = req.params.data;
	var buffer = new Buffer(data, 'base64');
	var val = buffer.toString('ascii');
	val = JSON.parse(val);
	return next();
};

exports.query_table = function(req, res) {
	db_model.query_tables(function(err, table) {
		if (err) {
			res.render('home', {

			});
		}
		else {
			db_model.query_columns(function(err, table_column) {
				if (err) {

				}
				else {
					var column = {
						name: '', type: ''
					};
					var tables = {
						table_name: '' , columns: []
					};
					var data = [];
					
					var labels = [];
					var data_set = [];
					var data_label = {
						label: 'Table Columns'
					}
					var data_val = [];
					var count = 0;
					for (var i = 0; i < table_column.length; i++) {
						if (i < table_column.length -1) {
							if (table_column[i].table_name === table_column[i+1].table_name) {
								column = {
									name: table_column[i].column_name, type: table_column[i].type
								};
								tables.columns.push(column);
								count++;
							}
							else {
								column = {
									name: table_column[i].column_name, type: table_column[i].type
								};
								tables.columns.push(column);
								tables.table_name = table_column[i].table_name;
								data.push(tables)
								labels.push(table_column[i].table_name);
								count++;
								data_val.push(count);
								count = 0;
								tables = {
									table_name: '', columns: []
								}
							}
						}
						else {
							column = {
								name: table_column[i].column_name, type: table_column[i].type
							};
							tables.columns.push(column);
							tables.table_name = table_column[i].table_name;
							labels.push(table_column[i].table_name);
							data.push(tables)
							count++;
							data_val.push(count);
						}
					}
					data = JSON.stringify(data);


					data_label['data'] = data_val;
					var obj = {
							labels: labels, datasets: [data_label]
					};
					obj = JSON.stringify(obj);
					res.render('home', {
						tables: data,
						graph: obj
					});
				}
			})
		}
	});
}