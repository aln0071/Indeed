#!/bin/bash
KAFKA_HOME='~/';
if [[ $KAFKA_HOME != *"kafka_2.13-3.0.0" ]]; then
  echo "Please set correct kafka home path inside this script on line 2"
else
    cd $KAFKA_HOME
    for TOPIC in indeed_create_message indeed_get_messages indeed_create_room indeed_get_rooms indeed_put_company indeed_get_company indeed_apply_job indeed_get_reviews indeed_add_jobseekerInfo_salary indeed_get_all_company indeed_get_jobs indeed_get_reviews indeed_post_reviews response_topic indeed_get_all_job_locations indeed_post_job indeed_post_company indeed_get_all_jobs indeed_get_job indeed_get_jobseeker_profile; do
    bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic $TOPIC
    done
fi