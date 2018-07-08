
module.exports = (req, res) => {
	const hubChallege = req.query['hub.challenge']
	const hubMode = req.query['hub.mode']

	const verifyToken = (req.query['hub.verify_token']==='troopzbot')
	if (hubMode&& verifyToken) {
		res.status(200).send(hubChallenge);
	 } else {
		res.status(403).end();
	 }
}