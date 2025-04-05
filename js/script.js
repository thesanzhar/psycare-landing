// Модалды ашу
function openModal() {
    document.getElementById('contactModal').classList.remove('hidden');
  }
  
  // Модалды жабу
  function closeModal() {
    document.getElementById('contactModal').classList.add('hidden');
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Жүктеу индикаторын көрсету
        document.getElementById('loadingSpinner').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none'; // Қажет болса, алдыңғы хабарламаны жасыру

        var name = document.getElementById('name').value;
        var phone = document.getElementById('phone').value;
        var message = document.getElementById('message').value;

        // Сіздің боттың токені мен chat_id
        var botToken = '7700292238:AAELUC6XMPpkoPTgfMjbseEa23LeBZJFofg';
        var chatId = '-4630078549'; // chat_id, жеке чат немесе топ

        var text = `Жаңа заявка!\nАты: ${name}\nТелефон: ${phone}\nХабарлама: ${message}`;

        var url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('loadingSpinner').style.display = 'none';

                // 2-3 секунд күтіп, хабарлама көрсету
                setTimeout(function() {
                    document.getElementById('successMessage').style.display = 'block';
                }, 2000);

                // Форма өрістерін тазалау
                document.getElementById('contact-form').reset();
            })
            .catch(error => {
                console.error('Қате орын алды:', error);
                document.getElementById('loadingSpinner').style.display = 'none';
                alert('Қателік орын алды, қайтадан көріп шығыңыз.');
            });
    });
  });

// Гамбургер менюсы мен навигацияны басқару
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');
const menuLinks = document.querySelectorAll('.menu-link'); // Барлық якорь сілтемелері

// Гамбургер менюсын басқанда меню ашылады/жабылады
hamburgerMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show'); // .show классын қосу немесе алу
});

// Якорь сілтемесін басқанда меню жабылады
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show'); // Меню жабылады
    });
});


// Тест формасын алу
const form = document.getElementById('psychologicalTestForm');
const resultDiv = document.getElementById('result');
const resultText = document.getElementById('resultText');

// Сұрақтар мен жауаптар үшін әрбір жауаптың таңдалған санын сақтайтын объект
let answersCount = {
    yes: 0,
    no: 0,
    sometimes: 0
};

// Форманы жібергенде нәтиже көрсету
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Форма жіберуін тоқтату

    // Сұрақтарға жауаптарды жинап алу
    const formData = new FormData(form);
    formData.forEach((value, key) => {
        if (answersCount[value] !== undefined) {
            answersCount[value] += 1;
        }
    });

    // Нәтиже шығару
    let result = '';
    if (answersCount.yes > answersCount.no && answersCount.yes > answersCount.sometimes) {
        result = '“Сізде стресс немесе эмоционалдық қиындықтар болуы мүмкін. Өзіңізге уақыт бөліңіз, жақындарыңызбен сөйлесіңіз және қажет болса, маманнан көмек сұраңыз. Сіз жалғыз емессіз!”';
    } else if (answersCount.no > answersCount.yes && answersCount.no > answersCount.sometimes) {
        result = '“Сіздің психологиялық жағдайыңыз тұрақты көрінеді, бірақ өз эмоцияларыңызға назар аударып, өзін-өзі күтуге уақыт бөлуді ұмытпаңыз!”';
    } else {
        result = '“Кейде біз бәрін өзіміз шешуге тырысамыз, бірақ қолдау сұрау – әлсіздік емес. Эмоциялық күйіңізді жақсарту үшін көбірек демалыңыз және өз сезімдеріңізді ашық білдіруге тырысыңыз.”';
    }

    // Нәтиже көрсету
    resultText.textContent = result;
    resultDiv.style.display = 'block'; // Нәтиже көрінуі үшін
});
