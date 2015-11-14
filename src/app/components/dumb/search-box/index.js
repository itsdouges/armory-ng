import styles from './search-box.less';

export default function component () {
	return {
		restrict: 'E',
		scope: {},
		controller: SearchBox,
		controllerAs: 'ctrl',
		template: `
			<a href="">
				<i class="fa fa-search"></i>
			</a>
		`
	};
}

class SearchBox {

}