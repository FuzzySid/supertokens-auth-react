/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * Imports.
 */
import { PureComponent } from "react";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon";
import StyleContext from "../../../../../styles/styleContext";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { LinkClickedScreenProps } from "../../../types";
/*
 * Component.
 */

class PasswordlessLinkClickedScreen extends PureComponent<LinkClickedScreenProps> {
    static contextType = StyleContext;

    /*
     * Methods.
     */

    render = (): JSX.Element => {
        const styles = this.context;

        return (
            <div data-supertokens="container" css={styles.container}>
                <div data-supertokens="row" css={styles.row}>
                    <div data-supertokens="spinner" css={styles.spinner}>
                        <SpinnerIcon color={styles.palette.colors.primary} />
                    </div>
                </div>
            </div>
        );
    };
}

export const LinkClickedScreen = withOverride("PasswordlessLinkClickedScreen", PasswordlessLinkClickedScreen);
