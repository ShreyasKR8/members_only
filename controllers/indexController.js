const db = require('../db/queries');

exports.showHomePage = async (req, res) => {
    res.render('index');
}

exports.joinClubGet = async (req, res) => {
    res.render('join-club');
}

exports.joinClubPost = async (req, res) => {
    const passcode = req.body.passcode.toLowerCase().trim();
    
    if(passcode === process.env.PASSCODE) {
        await db.makeMember(req.user.id);
    }
    res.redirect('/');
}