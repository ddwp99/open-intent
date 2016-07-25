/*
|---------------------------------------------------------|
|    ___                   ___       _             _      |
|   / _ \ _ __   ___ _ __ |_ _|_ __ | |_ ___ _ __ | |_    |
|  | | | | '_ \ / _ \ '_ \ | || '_ \| __/ _ \ '_ \| __|   |
|  | |_| | |_) |  __/ | | || || | | | ||  __/ | | | |_    |
|   \___/| .__/ \___|_| |_|___|_| |_|\__\___|_| |_|\__|   |
|        |_|                                              |
|                                                         |
|     - The users first...                                |
|                                                         |
|     Authors:                                            |
|        - Clement Michaud                                |
|        - Sergei Kireev                                  |
|                                                         |
|     Version: 1.0.0                                      |
|                                                         |
|---------------------------------------------------------|

The MIT License (MIT)
Copyright (c) 2016 - Clement Michaud, Sergei Kireev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var exec = require('child_process').exec;
var should = require('should');

function compare(expected, actual) {
   should.equal(expected.length, actual.length);

   for(var i=0; i<expected.length; ++i) {
      var re = new RegExp(expected[i]);
      actual[i].should.match(re);
   }
}

describe('Time bot tests', function() {
   it('should give the current time', function(done) {
      var expected_output = [
         ">>> Ready to talk to the chatbot <<<",
         "> Hello, I can tell you what time it is if you ask.",
         "> It is [0-9]{2}:[0-9]{2}:[0-9]{2}.",
         "> "
      ];

      exec('echo "Hello\nWhat time is it?\nquit\n" | nodejs app.js', function(error, stdout, stderr) {
         if(error) {
            console.error(error);
            return;
         }

         stdout = stdout.split('\n');
         compare(expected_output, stdout);
         done();
      });
   });

   it('should tell name and give current time', function(done) {
      var expected_output = [
         ">>> Ready to talk to the chatbot <<<",
         "> Hello, I can tell you what time it is if you ask.",
         "> My name is Bob.",
         "> It is [0-9]{2}:[0-9]{2}:[0-9]{2}.",
         "> "
      ];

      exec('echo "Hello\nWhat is your name?\nWhat time is it?\nquit\n" | nodejs app.js', function(error, stdout, stderr) {
         if(error) {
            console.error(error);
            return;
         }

         stdout = stdout.split('\n');
         compare(expected_output, stdout);
         done();
      });
   });

   it('should reply when it does not understand', function(done) {
      var expected_output = [
         ">>> Ready to talk to the chatbot <<<",
         "> Be gentle, say hello!",
         "> Hello, I can tell you what time it is if you ask.",
         "> I don't understand what you mean...",
         "> It is [0-9]{2}:[0-9]{2}:[0-9]{2}.",
         "> "
      ];

      exec('echo "What time is it?\nHello\nDon\'t you understand?\nWhat time is it?\nquit\n" | nodejs app.js', function(error, stdout, stderr) {
         if(error) {
            console.error(error);
            return;
         }

         stdout = stdout.split('\n');
         compare(expected_output, stdout);
         done();
      });
   });
});