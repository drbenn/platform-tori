import subprocess

# Open first command line, navigate to api-todo-nest directory, and run 'npm run start:dev'
api_todo_nest_process = subprocess.Popen(
    ["npm", "run", "start:dev"], cwd="../api-todo-nest", shell=True
)
print("Started api-todo-nest process.")

# Open another command line, navigate to UI directory, and run 'npm run start'
ui_ang_19_process = subprocess.Popen(
    ["npm", "run", "start"], cwd="../ui-ang-19", shell=True
)
print("Started ui-ang-19 process.")

# Keep the script running so the subprocesses don't terminate immediately
try:
    api_todo_nest_process.wait()
    ui_ang_19_process.wait()
except KeyboardInterrupt:
    print("Stopping processes...")
    api_todo_nest_process.terminate()
    ui_ang_19_process.terminate()