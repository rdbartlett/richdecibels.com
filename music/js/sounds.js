//requires tone.js & jquery

//start audio context after user input
var firstTime = true
$(document).on('click','body *',function(){
  if(firstTime){
    firstTime = false
    Tone.start()
    console.log('audio is ready')
    preload(arrayOfImages)
  }
});


var root = 130
var rootm1 = root * calcInterval(-1)
var rootm3 = root * calcInterval(-3)
var root2 = root * calcInterval(2)
var root3 = root * calcInterval(3)
var root4 = root * calcInterval(4)
var root5 = root * calcInterval(5)
var root6 = root * calcInterval(6)
var root7 = root * calcInterval(7)
var root8 = root * calcInterval(8)
var root9 = root * calcInterval(9)
var root10 = root * calcInterval(10)
var root11 = root * calcInterval(11)

$("#intervalWidget .btn1").click(function() { playFrequencyPair(root, root * 1.94) })
$("#intervalWidget .btn2").click(function() { playFrequencyPair(root, root * 2.00) })
$("#intervalWidget .btn3").click(function() { playFrequencyPair(root, root * 2.07) })
$("#intervalWidget .btn4").click(function() { playFrequencyPair(root, root * 2/1) })
$("#intervalWidget .btn5").click(function() { playFrequencyPair(root, root * 3/2) })
$("#intervalWidget .btn6").click(function() { playFrequencyPair(root, root * 4/3) })
$("#intervalWidget .btn7").click(function() { playFrequencyPair(root, root * 5/4) })
$("#intervalWidget .btn8").click(function() { playFrequencyPair(root, root * 5/3) })
$("#intervalWidget .btn9").click(function() { playFrequencyPair(root, root * 18/17) })
$("#intervalWidget .btn10").click(function(){ playFrequencyPair(root, root * 81/73) })
$("#intervalWidget .btn11").click(function(){ playFrequencyPair(root, root * 4/2.78) })


$("#semitoneWidget button").each(function(index){
  $(this).click(function(){ f = root * calcInterval(index); playNote(f); console.log(f) })
})

$("#widget3 .btn1").click(function(){ playInterval(root, 2) })
$("#widget3 .btn2").click(function(){ playInterval(root, 4) })
$("#widget3 .btn3").click(function(){ playInterval(root, 5) })
$("#widget3 .btn4").click(function(){ playInterval(root, 7) })
$("#widget3 .btn5").click(function(){ playInterval(root, 9) })
$("#widget3 .btn6").click(function(){ playInterval(root, 11) })

$("#widget3 .btn7").click(function(){ playInterval(root, 9) })
$("#widget3 .btn8").click(function(){ playInterval(root2, 9) })
$("#widget3 .btn9").click(function(){ playInterval(root7, 9) })

$("#widget4 .btn1").click(function(){ playTriad(root, 4, 7) })
$("#widget4 .btn2").click(function(){ playTriad(root2, 4, 7) })
$("#widget4 .btn3").click(function(){ playTriad(root5, 4, 7) })
$("#widget4 .btn4").click(function(){ playTriad(root7, 4, 7) })
$("#widget4 .btn5").click(function(){ playTriad(root, 3, 7) })
$("#widget4 .btn6").click(function(){ playTriad(root2, 3, 7) })
$("#widget4 .btn7").click(function(){ playTriad(root5, 3, 7) })
$("#widget4 .btn8").click(function(){ playTriad(root7, 3, 7) })


// I chord
$("#widget5 .btn1").click(function(){ playTriad(root, 4, 7) })
// ii chord
$("#widget5 .btn2").click(function(){ playTriad(root2, 3, 7) })
// iii chord
$("#widget5 .btn3").click(function(){ playTriad(root4, 3, 7) })
// IV chord
$("#widget5 .btn4").click(function(){ playTriad(root5, 4, 7) })
// V chord
$("#widget5 .btn5").click(function(){ playTriad(root7, 4, 7) })
// vi chord
$("#widget5 .btn6").click(function(){ playTriad(root9, 3, 7) })
// viidim chord
$("#widget5 .btn7").click(function(){ playTriad(root11, 3, 6) })

var seqPlaying = false
$("#widget5 .btn8").click(function(){
  if (seqPlaying){stopSequence()}
  else{playChordSequence(false)}
})
$("#widget5 .btn9").click(function(){
  if (seqPlaying){stopSequence()}
  else{playChordSequence(true)}
})


$("#modesWidget .btn1").click(function(){ playTriad(rootm3, 3, 7) })
$("#modesWidget .btn2").click(function(){ playTriad(rootm1, 3, 6) })
$("#modesWidget .btn3").click(function(){ playTriad(root, 4, 7) })
$("#modesWidget .btn4").click(function(){ playTriad(root2, 3, 7) })
$("#modesWidget .btn5").click(function(){ playTriad(root4, 3, 7) })
$("#modesWidget .btn6").click(function(){ playTriad(root5, 4, 7) })
$("#modesWidget .btn7").click(function(){ playTriad(root7, 4, 7) })
var seqPlaying = false
$("#modesWidget .btn8").click(function(){
  if (seqPlaying){stopSequence()}
  else{playChordSequence2(false)}
})
$("#modesWidget .btn9").click(function(){
  if (seqPlaying){stopSequence()}
  else{playChordSequence2(true)}
})

$("#widget6 .btn1").click(function(){ playTriad(root, 3, 7) })
$("#widget6 .btn2").click(function(){ playTriad(root, 3, 6) })
$("#widget6 .btn3").click(function(){ playTriad(root, 4, 7) })
$("#widget6 .btn4").click(function(){ playTriad(root, 2, 7) })
$("#widget6 .btn5").click(function(){ playTriad(root, 4, 7) })
$("#widget6 .btn6").click(function(){ playQuad(root, 4, 7, 11) })
$("#widget6 .btn7").click(function(){ playQuad(root, 4, 7, 10) })
$("#widget6 .btn8").click(function(){ playTriad(root, 3, 7) })
$("#widget6 .btn9").click(function(){ playQuad(root, 3, 7, 10) })

$("#widget7 .btn1").click(function(){ playQuad(root, 3, 7, 10) })
$("#widget7 .btn2").click(function(){ playQuad(root, 3, 6, 10) })

function calcInterval(semitones){
  return Math.pow(2, semitones/12)
}

function playNote(f1){
  const now = Tone.now()
  synth.triggerAttack(f1, now)
  synth.triggerRelease(f1, now+1.5)
}
function playFrequencyPair(f1, f2){
  const now = Tone.now()
  synth.triggerAttack(f1, now)
  synth.triggerRelease(f1, now+2)
  synth.triggerAttack(f2, now+0.5)
  synth.triggerRelease(f2, now+2)
}
function playFrequencyTriad(f1, f2, f3){
  const now = Tone.now()
  synth.triggerAttack(f1, now)
  synth.triggerRelease(f1, now+2)
  synth.triggerAttack(f2, now+0.4)
  synth.triggerRelease(f2, now+2)
  synth.triggerAttack(f3, now+0.8)
  synth.triggerRelease(f3, now+2)
  console.log (f1, Math.round(f2), Math.round(f3))

}
function playFrequencyQuad(f1, f2, f3, f4){
  const now = Tone.now()
  synth.triggerAttack(f1, now)
  synth.triggerRelease(f1, now+2)
  synth.triggerAttack(f2, now+0.3)
  synth.triggerRelease(f2, now+2)
  synth.triggerAttack(f3, now+0.6)
  synth.triggerRelease(f3, now+2)
  synth.triggerAttack(f4, now+0.9)
  synth.triggerRelease(f4, now+2)
}

function playInterval(root, interval){
  f1 = root
  f2 = root * calcInterval(interval)
  playFrequencyPair(f1, f2)
}

function playTriad(root, i1, i2){
  f1 = root
  f2 = root * calcInterval(i1)
  f3 = root * calcInterval(i2)
  playFrequencyTriad(f1, f2, f3)
  console.log (f1, Math.round(f2), Math.round(f3))
}

function playQuad(root, i1, i2, i3){
  f1 = root
  f2 = root * calcInterval(i1)
  f3 = root * calcInterval(i2)
  f4 = root * calcInterval(i3)
  playFrequencyQuad(f1, f2, f3, f4)
}

function showChordChart(i, elID){
  $(elID).attr("src", arrayOfImages[i])
}

function stopSequence(){
  seqPlaying = false
  Tone.Transport.stop();
  Tone.Transport.cancel();
  showChordChart(8, "#chordChart, #chordChart2, #chordChart3, #chordChart4")
}

function playChord(i, beat){
  chords = [
  [root, 4, 7 , "I Ionian"],
  [root7, 4, 7, "V Ionian"],
  [root9, 3, 7, "vi Ionian"],
  [root5, 4, 7, "IV Ionian"],
  [rootm3, 3, 7, "i Aeolian"],
  [root4, 3, 7, "v Aeolian"],
  [root5, 4, 7, "VI Aeolian"],
  [root2, 3, 7, "iv Aeolian"],
  [root4, 4, 7, "I Phyrgian"],
  [root11, 3, 6, "vdim Phyrgian"],
  [root, 4, 7, "VI Phyrgian"],
  [root9, 3, 7, "iv Phyrgian"]]

  f1 = chords[i][0]
  f2 = f1 * calcInterval(chords[i][1])
  f3 = f1 * calcInterval(chords[i][2])
  synth.triggerAttackRelease(f1, beat)
  synth.triggerAttackRelease(f2, beat)
  synth.triggerAttackRelease(f3, beat)
}

function randomNoteSequence(){
  notes = ["A4", "B4", "C4", "D4", "E4", "F4", "G4"]
  noteSeq = []
  for(j=0; j<4; j++){
    noteSeq.push(notes[Math.round(Math.random()*6)])
  }

  const seq = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, 0.1, time);
  }, noteSeq).start(0);
}

function playChordSequence(songGenerator){
  seqPlaying = true
  // Play the I, V, vi, IV chord sequence
  const now = Tone.now()
  i = -1

  Tone.Transport.bpm.value = 80;

  Tone.Transport.scheduleRepeat((time) => {
    i++
    playChord(i%4, "2n")
    Tone.Draw.schedule(() => {
      if(songGenerator) showChordChart(i%4, "#chordChart2");
      else showChordChart(i%4, "#chordChart");
    }, time);
  }, "2n");
  if(songGenerator) randomNoteSequence();
  Tone.Transport.start();
}

function playChordSequence2(songGenerator){
  seqPlaying = true
  // Play the i, v, VI, iv chord sequence
  const now = Tone.now()
  i = -1

  Tone.Transport.bpm.value = 80;

  Tone.Transport.scheduleRepeat((time) => {
    i++
    playChord(i%4+4, "2n")
    Tone.Draw.schedule(() => {
      if(songGenerator) showChordChart(i%4 + 4, "#chordChart4");
      else showChordChart(i%4 + 4, "#chordChart3");
    }, time);
  }, "2n");
  if(songGenerator) randomNoteSequence();
  Tone.Transport.start();
}

arrayOfImages = [
  "images/circle - I chord.png",
  "images/circle - V chord.png",
  "images/circle - vi chord.png",
  "images/circle - IV chord.png",
  "images/circle - i chord Aeolian.png",
  "images/circle - v chord Aeolian.png",
  "images/circle - VI chord Aeolian.png",
  "images/circle - iv chord Aeolian.png",
  "images/circle keyboard.png"]

function preload(arrayOfImages) {
  $(arrayOfImages).each(function () {
      $('<img />').attr('src',this).appendTo('body').hide();
  });
}

synthOpts = {
  oscillator: {
    type: "sine2",
  },
  volume: -12,
  envelope: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.5,
    release: 0.3,
  }
}
synth = new Tone.PolySynth(Tone.Synth)
synth.set(synthOpts)
// compressor = new Tone.Compressor(-50, 3)
// synth.chain(compressor, Tone.Destination);
synth.chain(Tone.Destination);

