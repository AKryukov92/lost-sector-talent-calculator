<?php
function PrintEffects($element) {
	for ($j = 0; $j < count($element["effects"]); $j++) {
		print "<li>". GetLocalizedProperty($element["effects"],$j, $GLOBALS["locale"]) . "</li>";
	}
} ?>

<div class="specials" style="color:#bac887;clear:both;">
<?php
for($i = 0; $i < count($specials); $i++) {
	$element = $specials[$i];
	if ($element["duration"] == 0) { ?><?php print Placeholder("t-instant-effect"); ?>
		<ul>
			<?php PrintEffects($element); ?>
		</ul>
	<?php } else if ($element["duration"] == 1) { ?><?php print Placeholder("t-turns-effect-start"); ?> 1 <?php print Placeholder("t-turn"); ?>
	<ul>
		<?php PrintEffects($element); ?>
	</ul>
	<?php } else { ?><?php print Placeholder("t-turns-effect-start"); ?> <?php print $element["duration"];?> <?php print Placeholder("t-turns"); ?>
	<ul>
		<?php PrintEffects($element); ?>
	</ul>
	<?php }
}
?>
</div>