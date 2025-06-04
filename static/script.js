function uploadContent() {

    // If textarea value changes.
    if (content !== textarea.value) {
        var temp = textarea.value;
        var request = new XMLHttpRequest();

        request.open('POST', window.location.href, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            if (request.readyState === 4) {

                // Request has ended, check again after 1 second.
                content = temp;
                setTimeout(uploadContent, 1000);
            }
        }
        request.onerror = function() {

            // Try again after 1 second.
            setTimeout(uploadContent, 1000);
        }
        request.send('text=' + encodeURIComponent(temp));

        // Make the content available to print.
        printable.removeChild(printable.firstChild);
        printable.appendChild(document.createTextNode(temp));
    }
    else {

        // Content has not changed, check again after 1 second.
        setTimeout(uploadContent, 1000);
    }
}

function updateCurrentUrl() {
    var currentUrl = window.location.href;
    document.getElementById('current-url').value = currentUrl;
}

function copyToClipboard() {
    var urlInput = document.getElementById('current-url');
    urlInput.select();
    urlInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        var button = document.getElementById('copy-url');
        var originalText = button.textContent;
        button.textContent = '已复制!';
        button.style.background = '#28a745';
        button.style.borderColor = '#28a745';
        
        setTimeout(function() {
            button.textContent = originalText;
            button.style.background = '#007bff';
            button.style.borderColor = '#007bff';
        }, 2000);
    } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动选择链接进行复制');
    }
}

function createNewUrl() {
    // 跳转到根路径，服务器会自动生成新的随机URL
    window.location.href = '/';
}

var textarea = document.getElementById('content');
var printable = document.getElementById('printable');
var content = textarea.value;

// Make the content available to print.
printable.appendChild(document.createTextNode(content));

// 初始化URL显示
updateCurrentUrl();

// 绑定按钮事件
document.getElementById('copy-url').addEventListener('click', copyToClipboard);
document.getElementById('new-url').addEventListener('click', createNewUrl);

textarea.focus();
uploadContent();
