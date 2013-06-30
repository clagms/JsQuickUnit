/***********************************************************************

  JsQuickUnit - Quickly define and run unit tests in any test framework.
  https://github.com/clagms/JsQuickUnit

  -------------------------------- (C) ---------------------------------

                           Author: Claudio Gomes
                            <cla.gms@gmail.com>

  Distributed under the BSD license:

    Copyright 2013 (c) Claudio Gomes <cla.gms@gmail.com>

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/

var makeFileSystem = function() {
	var fs = require('fs');
	var _ = require('underscore');
	
	var that = {};
	
	that.readFile = function(filePath) {
		return fs.readFileSync(filePath, 'utf8');
	};
	
	that.mapEachFile = function(dirPath, callback) {
		var files = fs.readdirSync(dirPath);
		return _.map(files, callback);
	};
	
	that.writeFile = function(filePath, data) {
		return fs.writeFileSync(filePath, data);
	};
	
	return that;
};

module.exports = makeFileSystem;