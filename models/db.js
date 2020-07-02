var mysql = require('./connection');
mysql = mysql.connection;
const db = mysql.config.database;

exports.query_tables = function(next) {
	var sql = 'SELECT TABLE_NAME AS table_name FROM INFORMATION_SCHEMA.TABLES where table_schema = ?';
	sql = mysql.format(sql, db);
	mysql.query(sql, next);
};

exports.query_columns = function(next) {
	var sql = 'select TABLE_NAME as table_name, COLUMN_NAME as column_name, DATA_TYPE as type from information_schema.columns where table_schema = ?';
	sql = mysql.format(sql, db);

	mysql.query(sql, next);
}
