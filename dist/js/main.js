
window.onload=function(){
	var mycat1 = 'Mister';
	var mycat2 = 'Misses';
	var counter = 0;
	var counter2 = 0;

	var elem1 = document.querySelector('.mycat1');
	elem1.addEventListener("click", function(){
			counter++;
			document.querySelector(".mycat1 h1").innerHTML = mycat1;
			document.querySelector(".mycat1 h4").innerHTML = "counter" + counter;
	});

	var elem2 = document.querySelector('.mycat2');
	elem2.addEventListener("click", function(){
			counter2++;
			document.querySelector(".mycat2 h1").innerHTML = mycat2;
			document.querySelector(".mycat2 h4").innerHTML = "counter" + counter2;
	});
};
