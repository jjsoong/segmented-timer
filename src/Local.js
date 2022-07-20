
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
			language: "Language:"
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
			notes: "*You can edit and delete existing segments by, first clicking on the segment (will highlight the segment in light blue), then clicking the pencil (edit) button or trash can (delete) button, respectively."
		},
		tooltips: {		
			settings: "Settings",
			help: "Help",
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
	{	// Google Translated... Appropriate localisation welcome, for anyone that finds this project...
		language: "Français",
		title: "Page Minuterie segmentée",
		settingsText: {
			fileio: "Importation/exportation de fichiers",
			fileioSub: "Téléchargez vos segments (actuels) localement sur votre système ou chargez des segments précédemment téléchargés.",
			selectFile: "Choisir le dossier:",
			import: "Charger le fichier sélectionné",
			export: "Télécharger les segments au format .json",
			language: "Langue:"
		},
		help: {
			heading: "Bonjour! Bienvenue sur la page du minuteur segmenté!",
			list: [
				"Commencez par cliquer sur le bouton '+' (ajouter) pour ajouter un nouveau segment.",
				"Donnez au segment un nom non vide et une durée non nulle (minutes:secondes).",
				"Cliquez sur 'Enregistrer' pour enregistrer le segment.",
				"Répétez (1-3) autant de fois pour ajouter plus de segments à votre goût.",
				"Appuyez sur le bouton de lecture pour démarrer la minuterie! Vous pouvez également regarder l'heure des segments.",
				"Appuyez sur le bouton pause pour mettre la minuterie en pause.",
				"Appuyez sur le bouton d'arrêt pour arrêter et réinitialiser la minuterie."
			],
			notes: "*Vous pouvez modifier et supprimer des segments existants en cliquant d'abord sur le segment (cela mettra le segment en surbrillance en bleu clair), puis en cliquant sur le bouton crayon (modifier) ou sur le bouton poubelle (supprimer), respectivement."	
		},
		tooltips: {		
			settings: "Réglages",
			help: "Des instructions",
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