import React from "react";
import _ from "lodash"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom";

const authUser = process.env.REACT_APP_LOCAL_STORAGE_USER

let AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	auth,
	...rest
}) => {
	const user = auth.data
	return (
		<Route
			{...rest}
			render={props => {

				if (isAuthProtected && !_.get(user, "id", false)) {
					return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
				}

				return (
					<Layout>
						<Component {...props} />
					</Layout>
				)
			}}
		/>
	)
}
const mapStatetoProps = ({ auth }) => {
	return {
		auth
	}
}

export default AppRoute = connect(mapStatetoProps, {})(AppRoute);
