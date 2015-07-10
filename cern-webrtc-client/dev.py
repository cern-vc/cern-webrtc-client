import argparse
import os

import subprocess

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Run the application')
    parser.add_argument('-s', '--setup', dest='run_setup', action='store_true',
                        help='Initializes Docker Machine with env')
    parser.add_argument('-b', '--build', dest='build_setup', action='store_true',
                        help='Build the project inside the docker-machine')
    parser.add_argument('-r', '--run', dest='run', action='store_true', help='Runs the project and all its services')

    args = parser.parse_args()

    if args.run_setup:
        bash_command = 'echo "Hello World"'
        os.system("docker-machine stop default")
        try:
            output = subprocess.check_output(
                ['bash', '-c', 'VBoxManage modifyvm "default" --natpf1 Webapp,tcp,127.0.0.1,4200,,4200'])
            print(output)
            output = subprocess.check_output(
                ['bash', '-c', 'VBoxManage modifyvm "default" --natpf1 Livereload,tcp,127.0.0.1,49152,,49152'])
            print(output)
        except subprocess.CalledProcessError:
            pass

        os.system("docker-machine start default")

        os.system("docker-machine env")
        os.system("eval $(docker-machine env)")


    if args.build_setup:
        os.system("docker-compose build")

    if args.run:
        os.system("docker-compose up")
