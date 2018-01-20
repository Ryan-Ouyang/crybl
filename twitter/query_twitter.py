import tweepy #twitter
import json
import pandas as pd
import datetime as dt
import numpy as np

class Query:

    consumer_key = 'IRF244LvSLvWotZNwg7C5MZnG'
    consumer_secret = 'UEBEIJLuFFnRLMDT6MtevrP44jtLleIHK9M3d0rbDAoEjNmJgg'
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

    access_token = '842404840609312769-bv2YyNn5vsxj9K1usZ7CHKdRc9o2tW2'
    access_token_secret = 'fwTuQNXviwVSGKdweAl2UTDovlgy6VIvf662soICM96gk'
    auth.set_access_token(access_token, access_token_secret)

    api = tweepy.API(auth)

    try:
        redirect_url = auth.get_authorization_url()
    except tweepy.TweepError:
        print 'Error! Failed to get request token.'
    
    positive_sentinment = [ 'rose', 'increase', 'buy', 'bull', 'high' 'long', 'up', "cheap"]
    negative_sentiment = [ 'fell', 'slip', 'slid', 'sell', 'bear', ' low', 'short', 'down', "bubble", "expensive", "crash", "falling"]

    def searchSentiment(tweetList, check_list):
        sentiment_list = []
    
        for tweet in tweetList:
             for sentimentWord in check_list:
                if sentimentWord in (tweet.text).lower() and 'RT @' not in tweet.text:
                    sentiment_list.append(tweet.text)
                    # print 'sentimenW: ' + sentimentWord
                    # print 'tweet:     ' + tweet.text + '\n'
                    continue
        return sentiment_list

    positive_list =[]
    negative_list =[]
    search_text = ['#CRYPTO', '#BITCOIN', '#BTC', '#ETHERIUM', '#ETH']
    search_number = 100

    newsfeed = []
    for text in search_text:
        search_result = api.search(text, lang="en", count=100, rpp=search_number)
    
        urlList = []
        for tweet in search_result:
            if 'RT @' not in tweet.text:
                data = {}
                data['time'] = str(tweet.created_at)
                data['handle'] = str(tweet.user.screen_name)
                data['text'] = tweet.text
                if 'media' in tweet.entities:
                    for image in tweet.entities['media']:
                        urlList.append(image['media_url'])    
                data['imageUrl'] = urlList
                json_data = json.dumps(data)
                newsfeed.append(json_data)

        
        print 'SEARCH RESULTS FOR ' + text +': ' + str(len(search_result))
        positive_list.append(searchSentiment(search_result, positive_sentinment))
        negative_list.append(searchSentiment(search_result, negative_sentiment))

    print '\n\nPOSITVE SENTIMENT TWEETS LIST HAS LENGTH ' + str(len(positive_list)) #+ ' IS:' + str(positive_list)
    print '\n\nNEGATIVE SENTIMENT TWEETS LIST HAS LENGTH ' + str(len(negative_list)) #+' IS:' + str(negative_list) 
    
    prediction = 'is doing well' if len(negative_list) > len(positive_list) else 'is doing poorly'    
    print '\n\n\t\t\tPREDICTION: THE LIST' + str(search_text) + '.... ' + prediction +'\n\n'
    
    print 'NEWSFEED JSON LIST:'
    for post in newsfeed:
        print post + '\n'
    
    with open('newsfeed.json', 'w') as outfile:
        json.dump(newsfeed, outfile)
