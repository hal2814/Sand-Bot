require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'all',
    results: 1
};

// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts);

let timer_count = 0;
let comment_counter =1;
function masterTimer() {
  if(timer_count < 300){
    timer_count +=1;
  }else if(timer_count ===300){
    comment_counter +=1;
    timer_count =0;
  }
}

function isOdd(num) {
	if((num % 2) === 1){
	return true}else{
  return false;
  }
}


function setTimer() {
  setInterval(() => {
    masterTimer();
  }, 1000);
}
// On comment, perform whatever logic you want to do
let sandCount = 0;
comments.on('comment', (comment) => {
  setTimer();
  console.log("counter: " + timer_count)
  console.log("comment: "+comment.body);
  if (comment.body.includes(' sand') || comment.body.includes(' sand ') || comment.body.includes(' Sand ') || comment.body.includes(' sandy ')) {
    // sandCount +=1;

    console.log("****SAND COMMENT****: "+comment.body);
    console.log("comment counter: "+comment_counter);

    if(isOdd(comment_counter)){
    comment.reply('I don’t like sand. It’s coarse and rough and irritating and it gets everywhere. Not like here. Here everything is soft and smooth.');
    }
  }
});
