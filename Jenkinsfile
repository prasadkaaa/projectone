pipeline {
    agent any

    environment {
        CF_API = "https://api.cf.us10-001.hana.ondemand.com"
        CF_ORG = "6e3b2a68trial"
        CF_SPACE = "dev"
       
    }

     stages {

        stage('Build + Deploy in Docker') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'btp-credentials',
                    usernameVariable: 'BTP_USER',
                    passwordVariable: 'BTP_PASS'
                )]) {

                   bat """
docker run --rm -v "%cd%":/src node:20 sh -c '
    apt-get update &&
    apt-get install -y curl &&

    curl -L https://packages.cloudfoundry.org/stable?release=linux64-binary&source=github -o cf.tgz &&
    tar -xzf cf.tgz &&
    mv cf /usr/local/bin &&
    chmod +x /usr/local/bin/cf &&

    cf --version &&

    cp -r /src /tmp/app &&
    cd /tmp/app &&

    npm install &&
    npm install -g @sap/cds-dk mbt &&

    mbt build &&

    cf login -a $CF_API -u $BTP_USER -p $BTP_PASS -o $CF_ORG -s $CF_SPACE --skip-ssl-validation &&

    cf deploy mta_archives/*.mtar
'
"""
                }
            }
        }

    }
}