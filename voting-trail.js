//get steem.js -> npm install steem --save
var steem = require('steem');

//get transactions from head block
steem.api.streamTransactions('head', function(err, result) {
  let txType = result.operations[0][0]
  let txData = result.operations[0][1]
  let includesVotes = checkBlockForVote(txType,txData)
  if (includesVotes) {
    console.log('POST FOUND: ', txData)
  }
});
function checkBlockForVote(txType,txData) {
  //check if voter is fbslo. If voter = fbslo, your account will vote same post.
  if( txData.voter == 'fbslo') {
    console.log('POST: ', txData)
    upvote(txData)
  }
}
function upvote(txData){
  console.log('Upvoting...',  )
  //You account name
  var voter = 'your-account';
  //Your account private posting key
  var wif = 'private-posting-key';
  var author = txData.author
  var permlink = txData.permlink
  //Change weight 100% vote = 10000; if you use txData.weight it will upvote with same voting weight as "followed" voter.
  var weight = txData.weight
  //Broadcast vote to blockchain
  steem.broadcast.vote(wif,voter,author,permlink,weight,console.log)
 }
