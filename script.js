let examDateTime = new Date('2026-06-07T09:00:00'); // 默认时间为2026年6月7日早上9点

function updateCountdown() {
    var now = new Date();
    var distance = examDateTime - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "高考已经开始！";
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // 更新带动画的数字
    updateElement('days', days);
    updateElement('hours', hours);
    updateElement('minutes', minutes);
    updateElement('seconds', seconds);

    setTimeout(updateCountdown, 1000);
}

function updateElement(id, newValue) {
    var element = document.getElementById(id);
    if (element.textContent !== newValue.toString()) {
        element.textContent = newValue;
        element.classList.add('fade-in-out');
        // 动画结束后移除动画类，以便下次动画能重新触发
        element.addEventListener('animationend', function() {
            element.classList.remove('fade-in-out');
        }, { once: true });
    }
}

document.getElementById('settingsButton').addEventListener('click', function() {
    var settings = document.getElementById('settings');
    settings.style.display = settings.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('toggleMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    var modeButton = document.getElementById('toggleMode');
    modeButton.textContent = document.body.classList.contains('dark-mode') ? '切换至白天模式' : '切换至黑暗模式';
});

document.getElementById('applySettings').addEventListener('click', function() {
    var grade = document.getElementById('gradeInput').value;
    var examDate = document.getElementById('examDateInput').value;
    var examTime = document.getElementById('examTimeInput').value;
    var backgroundColor = document.getElementById('backgroundColor').value;
    var buttonColor = document.getElementById('buttonColor').value;
    var blurAmount = document.getElementById('blurAmount').value;

    document.getElementById('grade').textContent = grade;
    document.body.style.backgroundColor = backgroundColor;
    document.getElementById('settingsButton').style.backgroundColor = buttonColor;
    document.getElementById('applySettings').style.backgroundColor = buttonColor;
    document.getElementById('toggleMode').style.backgroundColor = buttonColor;

    // 应用高斯模糊和毛玻璃效果到所有相关元素
    document.querySelectorAll('.settings, .countdown').forEach(el => {
        el.style.backdropFilter = `blur(${blurAmount}px)`;
        el.style.background = `rgba(255, 255, 255, 0.8)`; // 适当设置毛玻璃效果的背景
    });

    // 更新考试日期和时间
    examDateTime = new Date(`${examDate}T${examTime}:00`);
    
    // 重新开始倒计时
    updateCountdown();
});

// 文件选择背景图片
document.getElementById('backgroundImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(file);
    }
});

// 初始化倒计时
updateCountdown();
