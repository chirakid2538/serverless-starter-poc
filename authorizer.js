const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

exports.viaIDToken = (event, context, callback) => {
  console.log("viaIDToken function init", event);

  if (!event.authorizationToken) {
    return callback("Unauthorized");
  }

  const tokenParts = event.authorizationToken.split(" ");
  const tokenValue = tokenParts[1];
  if (!(tokenParts[0].toLowerCase() === "bearer" && tokenValue)) {
    return callback("Unauthorized");
  }

  return callback(
    null,
    generatePolicy("1k39dD230586jkf2z", "Allow", event.methodArn)
  );
};
