import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
	// Production 빌드 시, 리액트 코드 트랜스파일링 할 시작점 설정.
	entry: './src/index.tsx',
	output: {
		path: path.join(path.resolve(), '/dist'),
		filename: 'index_bundle.js'
	},

	// webpack Develop 모드 실행 시, 사용될 static 파일들 경로와 관리 방식 설정.
	devServer: {
		static: {
			directory: path.join(path.resolve(), 'public')
		},
		compress: true,
		port: 3000
	},

	// swc 연동을 위한 swc-loader 장착.
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'swc-loader'
				}
			}
		]
	},

	// 번들링된 JS 코드를 html 파일과 매핑 및 주입시키기 위한 플러그인 설정.
	plugins: [
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: path.join(path.resolve(), 'src/index.html')
		})
	],

	// 파일 확장자 해석 설정
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx']
	}
};

export default config;
