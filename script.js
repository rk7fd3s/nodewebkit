(function() {
  window.onload = function() {
    var exec       = require('child_process').exec,
        fs         = require('fs'),
        splash     = document.getElementById('splash'),
        main       = document.getElementById('main'),
        message    = document.getElementById('message'),
        btns       = document.getElementById('btns'),
        btn        = document.getElementById('actionBtn'),
        installing = false;

    var checkGrunt = function() {
      btns.style.display = "none";
      title.textContent = 'grunt';
      message.innerHTML = 'install checking......';

      var installGrunt = function (evt) {
        btns.style.display = "none";
        message.innerHTML = 'install now......';

        proc = exec('npm install gunt -g', function(err, stdout, srderr) {
          if (err ) {
            main.classList.add('error');
            message.innerHTML = 'インストールに失敗しました<br><br><pre>' + srderr + '</pre>';
          }
          return;
        });
      };

    // exec('ls -al /usr/local/bin/grunt2', function(err, stdout, stderr) {
      exec('which brew', function(err, stdout, stderr) {
        if ( ! err ) {
          if ( stdout !== '' ) {
            // すでにインストールされている
            btn.classList.add('installed');
            message.innerHTML = 'grunt はインストールされていました。<br>ボタンを押して次へ進んでください。';
            btn.textContent = '次へ';
            btn.addEventListener('click', checkWorkspace, false);
            btns.style.display = "block";
            return;
          }
        }

        message.innerHTML = 'grunt is not installed.<br>Begin the installation when the user presses the button.';
        message.innerHTML = 'grunt はインストールされていません。<br>ボタンを押すとインストールが開始されます。';
        btn.textContent = 'インストール';
        btn.addEventListener('click', installGrunt, false);
        btns.style.display = "block";

      });

    };

    var checkWorkspace = function() {
      btns.style.display = "none";
      title.textContent = 'Workspace';
      message.innerHTML = 'チェックアウトしたソースのnodeディレクトリを選択してください。<br>';
      message.innerHTML += '<input type="file" id="fileDialog" nwdirectory />';
      message.innerHTML += '<pre id="dirPath"></pre>';

      var chooser = document.querySelector('#fileDialog');
      chooser.addEventListener("change", function(evt) {
        var path = this.value;
        document.getElementById('dirPath').textContent = path;
        if (path.match(/node$/)) {
          btns.style.display = "block";
        } else {
          alert('もう一度選択してください');
        }
      }, false);
    };

    splash.addEventListener('click', function() {
      splash.style.display = "none";
      main.style.display = "block";
    }, false);

    checkGrunt();
  };
})();