const mysql = require('./index')

module.exports = {
	get: () => {
		return new Promise((resolve, reject) => {
			mysql.query('select * from db_klub_pssi', function(err, res){
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			})
		})
	}
}