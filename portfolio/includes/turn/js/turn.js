var TurnGame = (function(){
    var instance
    var initiate = function(heroName){
        var hero = {
            name: heroName,
            lev: 1,
            maxHp: 100,
            hp: 100,
            xp: 0,
            att: 10
        };
        // 몬스터 추가
        var monsters = [{
            name: '슬라임',
            hp: 25 + hero.lev * 3,
            att: 10 + hero.lev,
            xp: 10 + hero.lev
        },{
            name: '드래곤',
            hp: 50 + hero.lev * 5,
            att: 15 + hero.lev * 2,
            xp: 20 + hero.lev * 2
        },{
            name: '정훈[보스]',
            hp: 100 + hero.lev * 10,
            att: 25 + hero.lev * 5,
            xp: 50 + hero.lev * 5
        }];
        var monster = null;
        var turn = true;
        return {
            showLevel: function(){
                document.querySelector('#hero-level').innerHTML = hero.lev + 'Lev';
                return this; // 전역컨텍스트에서 this는 window를 가르킨다.
                             // 지역콘텍스트에서는 콘텍스트 객체를 가리킴
                             // 함수를 객체의 속성에 저장하는 경우 이 함수를 메소드라고 부름 
                             // 메소드를 호출할때 this 는 메소드를 포함하고 있는 객체에 바인딩 -> return {} 이름없는 객체?
            },
            showXp: function(){
                var self = this; 
                // setMessage를 실행시키기 위해! window에서 가리키는 this는 global
                if (hero.xp > 15 * hero.lev) {
                    hero.xp -= 15 * hero.lev;
                    hero.maxHp += 10;
                    hero.hp = hero.maxHp;
                    hero.att += hero.lev;
                    hero.lev++;
                    window.setTimeout(function(){
                        self.setMessage('Level up!');
                    }, 1000);
                }
                document.querySelector('#hero-xp').innerHTML = 'XP: ' + hero.xp + '/' + 15 * hero.lev;
                document.querySelector('#hero-att').innerHTML = 'ATT ' + hero.att;
                return this.showLevel().showHp(); 
                // 왜 레벨과 hp를 체이닝 했는지..
                // 이렇게 하면 이름은 getInstance에서 들어가고 showXp 호출시 lev, hp, xp, att 계속 반환되면서 실행!
            },
            showHp: function(){
                if (hero.hp < 0) {
                    return this.gameOver();
                }
                document.querySelector('#hero-hp').innerHTML = 'HP: ' + hero.hp + '/' + hero.maxHp;
                return this; // 왜 return 객체 전부를 반환하는 건지..
            },
            toggleMenu: function(){
                document.querySelector('#hero-name').innerHTML = hero.name;
                document.getElementById('start-screen').style.display = 'none';
                if (document.getElementById('game-menu').style.display === 'block') {
                    document.getElementById('game-menu').style.display = 'none';
                    document.getElementById('battle-menu').style.display = 'block';
                    document.getElementById('battle-input').focus();
                } else {
                    document.getElementById('game-menu').style.display = 'block';
                    document.getElementById('battle-menu').style.display = 'none';
                    document.getElementById('menu-input').focus();
                }
                return this;
            },
            setMessage: function(msg){
                document.getElementById('message').innerHTML = msg;
                return this;
            },  
            // 다음 메소드 추가!
            generateMonster: function(){
                monster = JSON.parse(JSON.stringify(monsters[Math.floor(Math.random()*monsters.length)]));
                document.getElementById('monster-name').innerHTML = monster.name;
                document.getElementById('monster-hp').innerHTML = 'HP: ' + monster.hp;
                document.getElementById('monster-att').innerHTML = 'ATT: ' + monster.att;
                this.setMessage(monster.name + '이(가) 공격해 옵니다.');
                return this.toggleMenu();
            },
            menuInput : function(input){
                if (input === '1') {
                    return this.generateMonster();
                } else if(input === '2'){
                    hero.hp = hero.maxHp;
                    return this.showHp().setMessage('체력을 회복했습니다.');
                } else if(input === '3'){
                    return this.exit();
                } else {
                    alert('잘못된 입력입니다. 나와있는 숫자를 입력해 주세요^^')
                }
            },
            battleInput: function(input) {
                if (input === '1') {
                    return this.attackMonster();
                } else if(input === '2') {
                    if (hero.hp + hero.lev * 20 < hero.maxHp) {
                        hero.hp += hero.lev * 20;
                    } else {
                        hero.hp = hero.maxHp;
                    }
                    return this.showHp().setMessage('체력을 회복했습니다.').nextTurn()
                } else if(input === '3') {
                    return this.clearMonster().setMessage('도망쳤습니다.')
                } else {
                    alert('잘못된 입력입니다.');
                }
            },
            attackMonster: function() {
                monster.hp -= hero.att;
                document.getElementById('monster-hp').innerHTML = 'HP: ' + monster.hp;
                if (monster.hp > 0) {
                    return this.setMessage(hero.att + '의 데미지를 입혔습니다.').nextTurn();
                }
                return this.win();
            }, 
            attackHero: function() {
                hero.hp -= monster.att;
                return this.showHp();
            },
            nextTurn: function() {
                var self = this;
                turn = !turn;
                document.getElementById('battle-button').disabled = true;
                if (!turn) {
                    window.setTimeout(function(){
                        self.setMessage(monster.name + '의 턴입니다');
                        window.setTimeout(function(){
                            document.getElementById('battle-button').disabled = false;
                            if (self.attackHero()) {
                                self.setMessage(monster.att + '의 데미지를 입었습니다.');
                                window.setTimeout(function(){
                                    self.setMessage(hero.name + '의 턴입니다.')
                                }, 1000)
                            }
                        }, 1000)
                    }, 1000)
                    return this.nextTurn();
                }
                return this
            },
            win: function() {
                this.setMessage(monster.name + ' 사냥에 성공해 ' + monster.xp + '의 경험치를 얻었습니다.');
                hero.xp += monster.xp;
                return this.clearMonster().showXp()
            },
            clearMonster: function() {
                monster = null;
                document.getElementById('monster-name').innerHTML = '';
                document.getElementById('monster-hp').innerHTML = '';
                document.getElementById('monster-att').innerHTML = '';
                return this.toggleMenu();
            }, 
            gameOver: function() {
                document.getElementById('screen').innerHTML = hero.name + '은 레벨' + hero.lev + '에서 죽었습니다. 새로 시작하려면 새로고침하세요';
                return false;
            },
            exit: function(input) {
                document.getElementById('screen').innerHTML = '이용해주셔서 감사합니다.새로 시작하려면 새로고침하세요';
            }
        };
    };
    return {
        getInstance: function(name){
            if (!instance) {
                instance = initiate(name);
            }
            return instance; 
            // -----singleton pattern-----
            // getInstance라는 메소드를 가진 객체를 반환
            // getInstance 함수를 호출하는 순간 내부적으로 initiate 함수가 호출되고, 
            // instance에 아까 그 객체의 내용이 저장되고 동시에 반환됨. 
            // getInstance가 여러 번 호출됐을 경우에는 코드를 보면 이미 instance 객체가 있는 경우에는 
            // initiate를 거치지 않고 바로 반환한다.
        }
    };
})();
document.getElementById('start-screen').onsubmit = function(e){
    var name = document.getElementById('name-input').value;
    e.preventDefault(); // onsubmit에 따른 폼 전송(페이지 이동)을 막음.
    if (name && name.trim() && confirm(name + '으로 하시겠습니까?')) {
        TurnGame.getInstance(name).showXp().toggleMenu(); // 체이닝
        // 이 부분을 잘 보세요. instance 객체의 메소드를 연속으로 쓰고 있습니다. 
        // 바로 TurnGame.getInstance, TurnGame.showXp, TurnGame.showToggle 모두 
        // instance 또는 this를 return하기 때문인데요. 
        // (showXp는 showHp와 showLevel을 내부적으로 return합니다.) 
        // 계속 같은 객체를 return하기 때문에 그 객체의 메소드를 연속으로 쓸 수 있는겁니다. 
        // jQuery를 하신 분이라면 익숙할겁니다. 이러한 패턴을 메소드 체이닝이라고 부릅니다. 
        // 체인처럼 연속적으로 실행할 수 있다는 뜻입니다.
    } else {
        alert('이름을 입력하세요');
    }
};
document.getElementById('game-menu').onsubmit = function(e){
    var input = document.getElementById('menu-input');
    var option = input.value;
    e.preventDefault();
    input.value = '';
    TurnGame.getInstance().menuInput(option); // 새로 추가된 부분
};
document.getElementById('battle-menu').onsubmit = function(e){
    var input = document.getElementById('battle-input');
    var option = input.value;
    e.preventDefault();
    input.value= '';
    TurnGame.getInstance().battleInput(option); // 새로 추가된 부분
};
