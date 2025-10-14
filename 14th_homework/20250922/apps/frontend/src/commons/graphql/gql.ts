/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        amount\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.FetchUserLoggedInDocument,
    "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": typeof types.LoginUserDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query fetchBoardCommentsList($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      __typename\n    }\n  }\n": typeof types.FetchBoardCommentsListDocument,
    "\n  mutation deleteBoardComment($boardCommentId: ID!, $password: String) {\n    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)\n  }\n": typeof types.DeleteBoardCommentDocument,
    "\n  query FetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": typeof types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {\n    createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {\n      _id\n    }\n  }\n": typeof types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment($boardCommentId: ID!, $updateBoardCommentInput: UpdateBoardCommentInput!, $password: String) {\n    updateBoardComment(boardCommentId: $boardCommentId, updateBoardCommentInput: $updateBoardCommentInput, password: $password) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UpdateBoardCommentDocument,
    "\n  query fetchBoardCommentsWrite($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": typeof types.FetchBoardCommentsWriteDocument,
    "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": typeof types.FetchBoardDetailDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": typeof types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": typeof types.DislikeBoardDocument,
    "\n  query FetchBoardsList {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.FetchBoardsListDocument,
    "\n  mutation DeleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": typeof types.DeleteBoardDocument,
    "\n  query FetchBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime) {\n    fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.FetchBoardsDocument,
    "\n  query FetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {\n    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)\n  }\n": typeof types.FetchBoardsCountDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": typeof types.UploadFileDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": typeof types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n": typeof types.UpdateBoardDocument,
    "\n  query fetchBoardForEdit($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n": typeof types.FetchBoardForEditDocument,
};
const documents: Documents = {
    "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        amount\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchUserLoggedInDocument,
    "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n": types.CreateUserDocument,
    "\n  query fetchBoardCommentsList($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      __typename\n    }\n  }\n": types.FetchBoardCommentsListDocument,
    "\n  mutation deleteBoardComment($boardCommentId: ID!, $password: String) {\n    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)\n  }\n": types.DeleteBoardCommentDocument,
    "\n  query FetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n  mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {\n    createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {\n      _id\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment($boardCommentId: ID!, $updateBoardCommentInput: UpdateBoardCommentInput!, $password: String) {\n    updateBoardComment(boardCommentId: $boardCommentId, updateBoardCommentInput: $updateBoardCommentInput, password: $password) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  query fetchBoardCommentsWrite($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.FetchBoardCommentsWriteDocument,
    "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.FetchBoardDetailDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": types.DislikeBoardDocument,
    "\n  query FetchBoardsList {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardsListDocument,
    "\n  mutation DeleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  query FetchBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime) {\n    fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  query FetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {\n    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)\n  }\n": types.FetchBoardsCountDocument,
    "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  query fetchBoardForEdit($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n": types.FetchBoardForEditDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        amount\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query fetchUserLoggedIn {\n    fetchUserLoggedIn {\n      _id\n      email\n      name\n      picture\n      userPoint {\n        amount\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($email: String!, $password: String!) {\n    loginUser(email: $email, password: $password) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n      email\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardCommentsList($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      __typename\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardCommentsList($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      __typename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoardComment($boardCommentId: ID!, $password: String) {\n    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)\n  }\n"): (typeof documents)["\n  mutation deleteBoardComment($boardCommentId: ID!, $password: String) {\n    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchBoardComments($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      user {\n        _id\n        name\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {\n    createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {\n    createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment($boardCommentId: ID!, $updateBoardCommentInput: UpdateBoardCommentInput!, $password: String) {\n    updateBoardComment(boardCommentId: $boardCommentId, updateBoardCommentInput: $updateBoardCommentInput, password: $password) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment($boardCommentId: ID!, $updateBoardCommentInput: UpdateBoardCommentInput!, $password: String) {\n    updateBoardComment(boardCommentId: $boardCommentId, updateBoardCommentInput: $updateBoardCommentInput, password: $password) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardCommentsWrite($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardCommentsWrite($boardId: ID!, $page: Int) {\n    fetchBoardComments(boardId: $boardId, page: $page) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardDetail($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n      youtubeUrl\n      images\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchBoardsList {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchBoardsList {\n    fetchBoards {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation DeleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime) {\n    fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchBoards($page: Int, $search: String, $startDate: DateTime, $endDate: DateTime) {\n    fetchBoards(page: $page, search: $search, startDate: $startDate, endDate: $endDate) {\n      _id\n      writer\n      title\n      contents\n      likeCount\n      dislikeCount\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {\n    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)\n  }\n"): (typeof documents)["\n  query FetchBoardsCount($search: String, $startDate: DateTime, $endDate: DateTime) {\n    fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($file: Upload!) {\n    uploadFile(file: $file) {\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardForEdit($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardForEdit($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n      images\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;