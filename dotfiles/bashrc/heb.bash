# echo main.bash

ENDECA_USER=atg
# Java Settings
JAVA_HOME=/usr/java/latest; export JAVA_HOME
PATH=$JAVA_HOME/bin:$PATH; export PATH

#JBOSS Settings
export JBOSS_HOME=/appl/jboss/jboss
#export JBOSS_HOME=/appl/jboss/jboss-eap-5.1/jboss-as
export DEPLOY_HOME=$JBOSS_HOME/standalone/deployments/hebstore
#export DEPLOY_HOME=$JBOSS_HOME/server/hebstore/deploy
export PATH=$PATH:$JBOSS_HOME/bin

#ATG Settings
export DYNAMO_ROOT=/home/atg/atg
#export DYNAMO_ROOT=/appl/atg/atg
export DYNAMO_HOME=$DYNAMO_ROOT/home
export PATH=$PATH:$DYNAMO_HOME/bin

#ANT Settings
export ANT_HOME=/home/atg/apache-ant-1.9.4
export PATH=$PATH:$ANT_HOME/bin

#SARA Settings
#export SFC_CODE=$DYNAMO_ROOT/SARA/SpeedFC
export SFC_CODE=/home/atg/Desktop/eComm/_Wkspace/sara/SpeedFC

export LD_LIBRARY_PATH=/usr/lib/oracle/12.1/client64/lib/:$LD_LIBRARY_PATH
export PATH=$PATH:/usr/lib/oracle/12.1/client64/bin

alias ws='cd /home/atg/git/heb/modules'
alias ca='cd ~/git/heb/static-assets;cp -R * ~/jboss/standalone/deployments/hebstore/heb.ear/heb.war/.'
alias cls=clear
alias startatg='$JBOSS_HOME/bin/runstore.sh'
alias startendeca='~/scripts/start_endeca.sh'
alias startbcc='$JBOSS_HOME/bin/runbcc.sh'
alias startoracle='docker start bd6532a2365a1f8247dd6eb8a727b4672d43c520e5f62d6c0ff91b00cac6a854'
alias stoporacle='docker stop bd6532a2365a1f8247dd6eb8a727b4672d43c520e5f62d6c0ff91b00cac6a854'
alias stopendeca='~/scripts/stop_endeca.sh'
alias startall='wmctrl -r :ACTIVE: -N "JBOSS Server";cd ~/git/heb;git pull;date;echo waiting 20 sec;sleep 20s;echo building....;date;ant all;date;echo starting oracle; startoracle;date;echo waiting 2m for oracle to start;sleep 2m;startendeca;date;echo waiting 2m for endeca to start;sleep 2m;echo starting ATG!;startatg;'

complete -C /usr/share/ant/bin/complete-ant-cmd.pl ant

alias heb='cd ~/git/heb'

# Ryan's little helpers
alias cheb='cd ~/git/heb'
alias startheb='. ~/.bkup/scripts/startheb.sh'
alias starthebcas='. ~/.bkup/scripts/starthebcas.sh'
alias initheb='. ~/.bkup/scripts/initheb.sh'
alias inithebcas='. ~/.bkup/scripts/inithebcas.sh'
