
/*
	JavaScript file acting as the localisation file.

	Certainly not optimal, but I did not have the luxury of dealing with scanning server (?)
	directories for individual localisation files at the time of implementation.
	Maybe after the course project evaluation is finished...
 */
const local = [
	{
		language: "English",
		title: "Segmented Timer Page",
		settingsText: {
			fileio: "File Import/Export",
			fileioSub: "Download your (current) segments locally to your system, or load previously downloaded segments.",
			selectFile: "Select File:",
			import: "Load selected file",
			export: "Download segments as .json",
			language: "Language:",
			febaLbl: "Comments and/or feedback for the developer:",
			febaBtn: "Send feedback"
		},
		help: {
			heading: "Hello! Welcome to the Segmented Timer Page!",
			list: [
				"Get started by clicking the '+' (add) button to add a new segment.",
				"Give the segment a non-blank name and a non-zero time (minutes:seconds).",
				"Click 'Save' to save the segment.",
				"Repeat (1-3) as many times to add more segments to your liking.",
				"Press the play button to start the timer! You can watch the segments time as well.",
				"Press the pause button to pause the timer.",
				"Press the stop button to stop and reset the timer."
			],
			notes: [
				"*You can edit and delete existing segments by, first clicking on the segment (will highlight the segment in light blue), then clicking the pencil (edit) button or trash can (delete) button, respectively.",
				"The segmented timer was created to assist users in practicing completing a segmented activity in a timely matter.",
				"The idea was born of taking a stopwatch's lap function and applying it to a standard countdown timer.",
				"Instead of aiming to achieving the smallest lap, Segmented Timer users would plan out the sequence of timed activities/goals (segments) in advance, and aim to complete each activity/goal within their time limits.",
				"In this manner, users can readily track how much time is left and which activities/goals are up next. Users also are relieved of having to repeatedly reset and restart a single timer to achieve something similar with a standard timer.",
				"To account for users possibly taking longer or shorter for specific segments than the planned amount of time, this timer also features a function similar to a stopwatch's laps, which shall be called 'finish times'.",
				"If users finish earlier than intended, users may notify the timer with the checkmark (finish current segment) button. The timer will jump to the next segment, while carrying over the remaining time of the previous segment.",
				"If users take longer than intended (enter overtime), users can see how much longer they are taking (or have taken) as the segment's timer turns red and beings seeping to the negatives. Users should also note that the next segment will begin counting down as well, once in overtime!",
				"To better process the results, users should know that a green positive time is the amount of time they've saved for a segment. Conversely, a red negative time is the amount of additional time they've lost for that segment."
			]
		},
		tooltips: {		
			settings: "Settings",
			help: "Help",
			exit: "Exit panel / Return to timer",
			play: "Start/Play timer",
			pause: "Pause timer",
			stop: "Stop and reset timer",
			finish: "Finish current segment",
			add: "Add segment",
			edit: "Edit selected segment",
			delete: "Delete selected segment",
			clear: "Clear segment table"
		},
		segment: {
			namePH: "Segment name (letters, numbers, spaces, underscores)",
			timePH: "0:00 (non-zero)",
			save: "Save",
			cancel: "Cancel"
		}
	},
	{	// "Translated" using Google Translate... Appropriate localisation welcome, for anyone that finds this project...
		language: "Français",
		title: "Page Minuterie segmentée",
		settingsText: {
			fileio: "Importation/exportation de fichiers",
			fileioSub: "Téléchargez vos segments (actuels) localement sur votre système ou chargez des segments précédemment téléchargés.",
			selectFile: "Choisir le dossier:",
			import: "Charger le fichier sélectionné",
			export: "Télécharger les segments au format .json",
			language: "Langue:",
			febaLbl: "Commentaires et/ou feedback pour le développeur :",
			febaBtn: "Envoyer des commentaires"
		},
		help: {
			heading: "Bonjour! Bienvenue sur la page du minuteur segmenté!",
			list: [
				"Commencez par cliquer sur le bouton \"+\" (ajouter) pour ajouter un nouveau segment.",
				"Donnez au segment un nom non vide et une durée non nulle (minutes:secondes).",
				"Cliquez sur 'Enregistrer' pour enregistrer le segment.",
				"Répétez (1-3) autant de fois pour ajouter plus de segments à votre goût.",
				"Appuyez sur le bouton de lecture pour démarrer la minuterie! Vous pouvez également regarder l'heure des segments.",
				"Appuyez sur le bouton pause pour mettre la minuterie en pause.",
				"Appuyez sur le bouton d'arrêt pour arrêter et réinitialiser la minuterie."
			],
			notes: [
				"*Vous pouvez modifier et supprimer des segments existants en cliquant d'abord sur le segment (cela mettra le segment en surbrillance en bleu clair), puis en cliquant sur le bouton crayon (modifier) ou sur le bouton poubelle (supprimer), respectivement.",	
				"Le minuteur segmenté a été créé pour aider les utilisateurs à s'entraîner à effectuer une activité segmentée en temps opportun.",
				"L'idée est née de prendre une fonction chronomètre et de l'appliquer à un compte à rebours standard.",
				"Au lieu de viser à réaliser le plus petit tour, les utilisateurs du chronomètre segmenté planifieraient à l'avance la séquence d'activités/objectifs chronométrés (segments) et viseraient à terminer chaque activité/objectif dans leurs limites de temps.",
				"De cette manière, les utilisateurs peuvent facilement suivre le temps qu'il leur reste et les activités/objectifs à venir. Les utilisateurs sont également soulagés d'avoir à réinitialiser et à redémarrer à plusieurs reprises une seule minuterie pour obtenir quelque chose de similaire avec une minuterie standard.",
				"Pour tenir compte des utilisateurs prenant éventuellement plus ou moins longtemps pour des segments spécifiques que le temps prévu, ce chronomètre dispose également d'une fonction similaire aux tours d'un chronomètre, qui sera appelée «temps d'arrivée».",
				"Si les utilisateurs terminent plus tôt que prévu, les utilisateurs peuvent avertir le chronomètre avec le bouton coche (terminer le segment en cours). Le chronomètre passera au segment suivant, tout en reportant le temps restant du segment précédent.",
				"Si les utilisateurs prennent plus de temps que prévu (entrer des heures supplémentaires), les utilisateurs peuvent voir combien de temps ils prennent (ou ont pris) lorsque la minuterie du segment devient rouge et que les êtres s'infiltrent dans les négatifs. Les utilisateurs doivent également noter que le prochain segment commencera également à décompter, une fois en prolongation!",
				"Pour mieux traiter les résultats, les utilisateurs doivent savoir qu'un temps vert positif correspond au temps qu'ils ont gagné pour un segment. À l'inverse, un temps négatif rouge correspond au temps supplémentaire qu'ils ont perdu pour ce segment."
			]
		},
		tooltips: {		
			settings: "Réglages",
			help: "Des instructions",
			exit: "Panneau de sortie / Retour à la minuterie",
			play: "Démarrer la minuterie",
			pause: "Mettre le chronomètre en pause",
			stop: "Arrêter et réinitialiser la minuterie",
			finish: "Terminer le segment en cours",
			add: "Ajouter un segment",
			edit: "Modifier le segment sélectionné",
			delete: "Supprimer le segment sélectionné",
			clear: "Effacer le tableau des segments"
		},
		segment: {
			namePH: "Nom du segment (lettres, chiffres, espaces, traits de soulignement)",
			timePH: "0:00 (non nul)",
			save: "Enregistrer",
			cancel: "Annuler"
		}
	}
];

export default local;