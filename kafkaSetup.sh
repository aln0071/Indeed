#!/bin/bash
KAFKA_HOME='/~'
if [[ $KAFKA_HOME != *"kafka_2.13-3.0.0" ]]; then
  echo "Please set correct kafka home path inside this script on line 2"
else
    cd $KAFKA_HOME
    for TOPIC in indeed_get_reviews indeed_post_reviews response_topic; do
    bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic $TOPIC
    done
fi