# One Script, Dual Purpose: Unifying Performance and Functional Testing with k6

## Installation
Follow here to install [k6](https://k6.io/docs/get-started/installation/)

## Test Example Site
Following REST-API hosted dummy site used to test the http methods -  https://reqres.in/

## Cloning the Repository

1. First, navigate to the directory that you would like to clone the repository into using commands like:
    - `cd:` to change your working directory.
    - `cd ../` to "go back" a level in your directory tree.
2. Next, clone the remote repository and create a local copy on your machine using this command:
       `git clone https://github.com/bireshpatel/k6-demo.git`

## Run Functional Test

Run the functional test:`k6 run functional_test/k6_functional_test.js`

## Run Performance Test

Run the performance test:`k6 run performance_test/k6_performance_test.js`

## Results Path

Results can be found under `results` folder