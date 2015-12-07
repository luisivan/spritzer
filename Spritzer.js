// Inspired by http://jsfiddle.net/vKZLn/1/
var Spritzer = function (el) {

    el.classList.add('spritzed')
    el.style.padding = (parseInt(window.getComputedStyle(el)['font-size']) / 1.3) + 'px'

	el.appendChild(document.createElement("div"))

    this.playing = true

    this.currentTimer = null

    function processWord(word) {
        var center = Math.floor(word.length / 2),
            letters = word.split('')
        return letters.map(function(letter, idx) {
            if (idx === center)
                return '<span class="highlight">' + letter + '</span>'
            return letter;
        }).join('')
    }

    function positionWord() {
        var wordEl = el.firstElementChild,
            highlight = wordEl.firstElementChild
        
        var centerOffsetX = (highlight.offsetWidth / 2) + highlight.offsetLeft,
            centerOffsetY = (highlight.offsetHeight / 2) + highlight.offsetTop
        
        wordEl.style.left = ((el.clientWidth / 2) - centerOffsetX) + 'px'
        wordEl.style.top = ((el.clientHeight / 2) - centerOffsetY) + 'px'
    }

    var currentWord = 0,
        delay
    
    var displayNextWord = function() {
        var word = this.words[currentWord++]
        if (typeof word == 'undefined') return
        // WTB> nlp.js...
        var hasPause = /^\(|[,\.\)]$/.test(word)
        
        // XSS?! :(
       	window.el = el
        el.firstElementChild.innerHTML = word
        positionWord()

        if (currentWord !== this.words.length)
            this.currentTimer = setTimeout(displayNextWord, delay * (hasPause ? 2 : 1))
    }.bind(this)

    this.render = function(text, wpm) {
        this.words = text.replace(/^\s+|\s+|\n$/,'').split(/\s+/).map(processWord)
        delay = 60000 / wpm

        this.playing = true
        clearTimeout(this.currentTimer)
        displayNextWord()
    }

    this.play = function() {
        this.playing = true
        displayNextWord()
    }

    this.pause = function() {
        this.playing = false
        clearTimeout(this.currentTimer)
    }

    this.toggle = function() {
        if (this.playing)
            this.pause()
        else
            this.play()
    }
}