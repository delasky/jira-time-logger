## Jira Time Logger

### Get it

Download cli tool using npm (it may or may not work using yarn)
`npm install -g @hotschedules/log-time`

Note: package is hosted in artifactory so it is important to have artifactory credentials in your .npmrc
Second note: it is important to include the @hotschedules/ scope or else you will get someone elses (possibly malicious!) package

### Set it up

`log-time --help`

View available options. Before you can log-time, you will need to configure the tool with your jira credentials

`log-time config`

You will be prompted for your jira username and password. These will be saved in plaintext in a log-time.json file in your home directory. Basic authentication over https will be used to communicate with Jira... so if any of that freaks you out don't use this tool!

### Use it

There are two main commands

#### Log

`log-time log`

this will update a worklog for a jira ticket.

You can pass in a ticket number with `-j` and a time string with `-t` (example time string: 1 h, 1 m, 3 h and 30 m, etc)

if you don't pass them in with option flags you will be prompted for them

Example command

`log-time log -j "BD-111111" -t "4 h"`

#### Track

`log-time track`

this will start a timer in your terminal which will track your work on an issue until you tell it to stop

You can pass in a ticket number with `-j`

if you don't pass it in, you will be prompted for your ticket.

When the timer is running you can hit C-c or Esc to cancel tracking. Or you can hit space or enter to go ahead and submit your worklog

example command

`log-time track -j "BD-11111111"` then sometime later `space`

### Debugging

I hope it all works for you. If it doesn't let me know and I may be able to help?
