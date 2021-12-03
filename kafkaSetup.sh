#!/bin/bash
KAFKA_HOME='~/';
if [[ $KAFKA_HOME != *"kafka_2.13-3.0.0" ]]; then
  echo "Please set correct kafka home path inside this script on line 2"
else
    cd $KAFKA_HOME
    for TOPIC in indeed_update_applicant_status indeed_get_salaries indeed_review_photos_admin indeed_get_photos_admin indeed_employer_job_analysis indeed_analytics indeed_create_message indeed_post_undosave_job indeed_post_save_job indeed_post_featured_reviews indeed_get_featured_user_reviews indeed_get_user_reviews indeed_getapplied_job indeed_get_user_profile indeed_get_companyDetails indeed_get_companyDetails_by_employerId indeed_add_pictures indeed_post_helpful_reviews indeed_get_messages indeed_create_room indeed_get_rooms indeed_put_company indeed_get_company indeed_apply_job indeed_get_reviews indeed_add_jobseekerInfo_salary indeed_get_all_company indeed_get_jobs indeed_post_reviews response_topic indeed_get_all_job_locations indeed_post_job indeed_post_company indeed_get_all_jobs indeed_get_job indeed_get_jobseeker_profile indeed_userprofile_update indeed_get_all_reviews indeed_admin_review_action indeed_top5companies_based_on_reviews indeed_get_saved_jobs indeed_userProfile_deleteResume; do
    bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic $TOPIC &
    done
fi
wait