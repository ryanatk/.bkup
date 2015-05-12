export profile_name='mbp'

export ANT_HOME="/opt/ant"
export M2="/usr/local/apache-maven-3.x.y/bin"
export PATH=$M2:$PATH
#export JAVA_HOME='/Library/Java/JavaVirtualMachines/jdk1.8.0_71.jdk/Contents/Home'
#export JRE_HOME='/System/Library/Frameworks/JavaVM.framework/Versions/Current/JavaVM'
#export JRE_HOME='/System/Library/Frameworks/JavaVM.framework/Versions/1.6.0/Home'
export JAVA_HOME=$(/usr/libexec/java_home -v 1.7)
setjava() {
  export JAVA_HOME=$(/usr/libexec/java_home -v $1)
}

# ssh
alias prelive="ssh prelive.zappos.net"
alias sshubuntu='ssh ud43d7e3fd7c851837c6b.ant.amazon.com'
alias sshrhel5='ssh ryaatkin@ryaatkin.desktop.amazon.com'
alias sshodin='ssh -L 2009:127.0.0.1:2009 $USER.desktop.amazon.com'

# git
alias gpush='git push ratkinson HEAD'
alias gpull='git pull origin master'

# zeta build commands
alias tomstart='(cd ~/tomcat/; ./bin/startup.sh)'
alias tomstop='(cd ~/tomcat/; ./bin/shutdown.sh; sleep 2; killall -9 java;)'
alias tombounce='(cd ~/tomcat/; ./bin/shutdown.sh; sleep 8; killall -9 java; sleep 2; ./bin/startup.sh;)'
alias touchbounce='touch ~/tomcat/conf/web.xml'
alias heliosAtlasStart='cd ${ZETA_DIR}/Atlas; mvn clean package install -DbuildHeliosStack -DskipTests'
alias buildvalhalla='cd ${ZETA_DIR}/valhalla; mvn clean install -DskipTests -U'
alias buildbroadway-common='cd ${ZETA_DIR}/broadway/broadway-common && mvn clean install -DskipTests'
alias buildspock='cd ${ZETA_DIR}/spock && export JAVA_HOME=$(/usr/libexec/java_home) && export "CATALINA_OPTS=-Dlog4j.configuration=file:$HOME/tomcat/conf/log4j.xml" && mvn clean compile install -DskipTests -U'
alias broadwaystart='cd ${ZETA_DIR}/broadway/broadway-server && mvn jetty:run; echo -e "\a"'
alias totstart='JAVA_HOME=/usr; JRE_HOME=/usr; tomstart; tail -f -n 500 ~/tomcat/logs/tomcat/*catalina.out'
alias valhallastart='setjava 1.8; tomstart; tomlogs'
alias jmeter='/Users/ratkinson/apache-jmeter-2.8/bin/jmeter ; exit;'
alias java7='source ~/.exports/java7'
alias java8='source ~/.exports/java8'

# zeta file locations
export ZETA_DIR='/Users/ryaatkin/zeta'
export WORKSPACE_DIR='${ZETA_DIR}'
alias cz='cd ${ZETA_DIR}'
alias cfront='cd ${ZETA_DIR}/frontends'
alias csahara='cd ${ZETA_DIR}/frontends/sahara'
alias cthor='cd ${ZETA_DIR}/frontends/thor'
alias chamlet='cd ${ZETA_DIR}/frontends/hamlet'
alias ckirk='cd ${ZETA_DIR}/frontends/kirk'
alias ctater='cd ${ZETA_DIR}/frontends/tater'
alias cpinot='cd ${ZETA_DIR}/frontends/pinot'
alias cabu='cd ${ZETA_DIR}/frontends/abu'
alias cps='cd ${ZETA_DIR}/pixel-server'
alias cdev='cd ${ZETA_DIR}/dev-properties'

alias carttable='mvim rebar/macros/z/cartTable.ftl'
alias pixels='mvim zappos.com/checkout/trackingPixels.ftl 6pm.com/checkout/trackingPixels.ftl'

# tail logs
alias elogs='tail -n 2000 -f ${ZETA_DIR}/cargo/configurations/*/logs/* | grep "\[ERROR\]" -A 8 '
alias etomlogs='tail -n 2000 -f ~/tomcat/logs/*catalina.out | grep "\[ERROR\]" -A 8 '
alias tomlogs='tail -n 1000 -F ~/tomcat/logs/*catalina.out'

# edit properties files
alias espring='vim ~/.spring/global.properties'
alias ehelios='vim ~/.spring/helios.properties'

# in frontend, run clipboard thru closure
alias jscompress='pbpaste | java -jar closure.jar | pbcopy'

# ec2
export EC2_HOME=~/.aws/ec2-api-tools-1.6.7.1
export PATH=$PATH:$EC2_HOME/bin:~/.aws/AWS-ElasticBeanstalk-CLI-2.3.1/eb/macosx/python2.7

# get zfc headers back in curl
alias curlz='curl -H "X-ZFC-Debug: on" -I'

# get headers back in curl that sys needs for debugging
alias curlsys='curl -qisv -o/dev/null'

# get akamai headers back in curl (does not work in the office)
alias curla='curl -H I -"Pragma: akamai-x-cache-on" -I'

# get all the akamai headers back in curl (does not work in the office)
alias curlakamai='curl -qisv -H "Pragma: akamai-x-cache-on, akamai-x-cache-remote-on,  akamai-x-check-cacheable, akamai-x-get-cache-key, akamai-x-get-extracted-values,  akamai-x-get-nonces, akamai-x-get-ssl-client-session-id, akamai-x-get-true-cache-key,  akamai-x-serial-no"'

# lode
export ANT_OPTS='-Dhappytrails.platform.override=RHEL5 -Dhappytrails.root=/usr/local/lode/ZapposEaseOfDevelopment/happytrails -Xmx500M'
launchctl setenv ANT_OPTS "$ANT_OPTS"
