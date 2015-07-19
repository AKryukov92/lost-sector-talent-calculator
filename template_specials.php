<?php
function PrintEffects($element) {
	for ($j = 0; $j < count($element["effects"]); $j++) {
		print "<li>". $element["effects"][$j]. "</li>";
	}
} ?>

<div class="specials" style="color:#bac887">
<?php
for($i = 0; $i < count($specials); $i++) {
	$element = $specials[$i];
	if ($element["duration"] == 0) { ?>При применении:
		<ul>
			<?php PrintEffects($element); ?>
		</ul>
	<?php } else if ($element["duration"] == 1) { ?>Длится в течениие 1 раунда
	<ul>
		<?php PrintEffects($element); ?>
	</ul>
	<?php } else { ?>Длится в течениие  <?php print $element["duration"];?> раундов
	<ul>
		<?php PrintEffects($element); ?>
	</ul>
	<?php }
}
?>
</div>