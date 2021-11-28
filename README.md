# ws-server

deployed on raspberry pi: [http://192.168.0.14/](http://192.168.0.14/)

# Notes

Raspberry pi zero could not compile the sources (not enough memory) so I had to commit the build files. Sorry Github !

# Deployment issues

sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5000

sudo iptables --wait --table nat --append OUTPUT --protocol tcp --dport 80 --jump REDIRECT --to-port 5000

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 5000
